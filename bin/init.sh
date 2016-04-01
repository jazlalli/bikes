#!/bin/bash
echo "Crawling and scraping prduct data..."
(cd scraper/ && exec npm run crawl && exec npm run scrape)