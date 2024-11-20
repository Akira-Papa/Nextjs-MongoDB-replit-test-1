import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export async function GET() {
  try {
    console.log('Generating date...');
    const date = new Date();
    const formattedDate = format(date, 'yyyy年MM月dd日 HH時mm分ss秒', { locale: ja });
    console.log('Current date:', date.toISOString());
    
    return NextResponse.json({ date: formattedDate });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
