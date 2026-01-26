import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface LibraryDoc {
  id: string;
  title: string;
  description: string;
  date: string;
  url: string;
  source: 'Comisión Europea' | 'AESIA' | 'Other';
  language: 'ES' | 'EN';
  tags: string[];
}

const TARGET_FILE = path.join(process.cwd(), 'src/data/library-docs.json');

async function scrapeEuropeanCommissionLibrary(): Promise<LibraryDoc[]> {
  console.log('Scraping European Commission Library...');
  try {
    const { data } = await axios.get('https://digital-strategy.ec.europa.eu/es/library', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(data);
    const docs: LibraryDoc[] = [];
    const targetKeywords = ['Artificial Intelligence', 'Digital Services Act', 'Data Governance', 'Inteligencia Artificial', 'IA', 'Gobernanza de Datos'];

    // Selectors based on the EC library structure (usually .ecl-list-item or article)
    $('.ecl-u-d-flex, .ecl-list-item, article, .listing__item').each((_, element) => {
      const title = $(element).find('.ecl-link, h3, .ecl-heading, .listing__title').text().trim();
      const link = $(element).find('a').attr('href');
      const dateText = $(element).find('.ecl-meta__item, .date, .listing__meta').text().trim();
      const description = $(element).find('.ecl-paragraph, p, .listing__content').text().trim();
      
      // Filter by keywords
      const matchesKeyword = targetKeywords.some(keyword => 
        title.toLowerCase().includes(keyword.toLowerCase()) || 
        description.toLowerCase().includes(keyword.toLowerCase())
      );

      if (title && link && matchesKeyword) {
        const fullUrl = link.startsWith('http') ? link : `https://digital-strategy.ec.europa.eu${link}`;
        
        // Detect language (simple heuristic)
        const isSpanish = title.includes(' y ') || title.includes(' de ') || title.includes(' la ');
        
        docs.push({
          id: `ec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title,
          description: description || "Documento oficial de la biblioteca de estrategia digital.",
          date: dateText || new Date().toISOString().split('T')[0],
          url: fullUrl,
          source: 'Comisión Europea',
          language: isSpanish ? 'ES' : 'EN',
          tags: ['#ComisiónEuropea', '#DigitalStrategy']
        });
      }
    });

    console.log(`Found ${docs.length} documents from European Commission.`);
    return docs;

  } catch (error) {
    console.error('Error scraping European Commission:', error);
    // Return fallback data if scraping fails
    return [
      {
        id: 'ec-fallback-1',
        title: 'White Paper on Artificial Intelligence - A European approach to excellence and trust',
        description: 'Libro Blanco sobre Inteligencia Artificial: un enfoque europeo orientado a la excelencia y la confianza.',
        date: '2020-02-19',
        url: 'https://ec.europa.eu/info/sites/default/files/commission-white-paper-artificial-intelligence-feb2020_en.pdf',
        source: 'Comisión Europea',
        language: 'EN',
        tags: ['#WhitePaper', '#IA']
      },
      {
        id: 'ec-fallback-2',
        title: 'Coordinated Plan on Artificial Intelligence 2021 Review',
        description: 'Revisión del Plan Coordinado sobre Inteligencia Artificial.',
        date: '2021-04-21',
        url: 'https://digital-strategy.ec.europa.eu/en/library/coordinated-plan-artificial-intelligence-2021-review',
        source: 'Comisión Europea',
        language: 'EN',
        tags: ['#PlanCoordinado', '#IA']
      }
    ];
  }
}

// AESIA Mock Data generator (since we want to group by Custodio)
function getAESIADocs(): LibraryDoc[] {
    return [
        {
            id: 'aesia-1',
            title: 'Guía Nacional de Notificación de Incidentes de IA',
            description: 'Protocolo oficial para la comunicación de brechas de seguridad y fallos en sistemas de IA de alto riesgo.',
            date: '2025-01-10',
            url: 'https://aesia.digital.gob.es/guias',
            source: 'AESIA',
            language: 'ES',
            tags: ['#AESIA', '#Seguridad']
        },
        {
            id: 'aesia-2',
            title: 'Estatuto de la Agencia Española de Supervisión de la IA',
            description: 'Marco legal y competencias de la AESIA como autoridad de vigilancia del mercado.',
            date: '2023-08-22',
            url: 'https://boe.es/diario_boe/txt.php?id=BOE-A-2023-18903',
            source: 'AESIA',
            language: 'ES',
            tags: ['#AESIA', '#Estatuto']
        }
    ];
}

async function main() {
  const ecDocs = await scrapeEuropeanCommissionLibrary();
  const aesiaDocs = getAESIADocs();
  
  const allDocs = [...aesiaDocs, ...ecDocs];
  
  // Write to file
  fs.writeFileSync(TARGET_FILE, JSON.stringify(allDocs, null, 2));
  console.log(`Successfully synced ${allDocs.length} documents to ${TARGET_FILE}`);
}

main();
