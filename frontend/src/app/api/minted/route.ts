import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src\\lib', 'minted_nfts.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const nftData = JSON.parse(fileContent);
    
    const formattedData = Object.entries(nftData).map(([tokenId, tokenURI]) => ({
      tokenId,
      tokenURI,
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error reading NFT data:', error);
    return NextResponse.json({ error: 'Failed to read NFT data' }, { status: 500 });
  }
}

