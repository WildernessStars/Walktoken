import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'components', 'abi.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    // const nftData = JSON.parse(fileContent);
    return new Response(fileContent);
  } catch (error) {
    console.error('Error reading ABI data:', error);
    return NextResponse.json({ error: 'Failed to read ABI data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try{
    const { address, abi } = await req.json();
    const filePathAbi = path.join(process.cwd(), 'src', 'components', 'abi.json');
    await fs.writeFile(filePathAbi, abi);
    const filePathAddr = path.join(process.cwd(), 'src', 'components', 'address.json');
    const addrs = await fs.readFile(filePathAddr, 'utf-8');
    let data = [];
    data = JSON.parse(addrs);
    data["NFTAddress"] = address;
    await fs.writeFile(filePathAddr, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: 1}, { status: 200 });
  } catch(error){
    console.error('Error writing Contract data:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

