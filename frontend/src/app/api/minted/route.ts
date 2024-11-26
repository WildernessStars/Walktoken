import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'minted_nfts.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const nftData = JSON.parse(fileContent);
    
    const formattedData = Object.entries(nftData).map(([tokenURI, tokenId]) => ({
      tokenURI,
      tokenId,
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error reading NFT data:', error);
    return NextResponse.json({ error: 'Failed to read NFT data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try{
    const { url, id } = await req.json();
    const fileName = path.join(process.cwd(), 'src', 'lib', 'minted_nfts.json');
    let data = [];
    const fileContent = await fs.readFile(fileName, 'utf-8');
    data = JSON.parse(fileContent);
    data[url] = id;
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: data}, { status: 200 });
  } catch(error){
    console.error('Error reading NFT data:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

