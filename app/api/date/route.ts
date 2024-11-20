import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export async function GET() {
  try {
    const date = new Date();
    // Format directly without timezone conversion since we're using server time
    const formattedDate = format(date, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja });
    
    return NextResponse.json({ date: formattedDate });
  } catch (error) {
    console.error('Date formatting error:', error);
    return NextResponse.json({ error: 'Failed to format date' }, { status: 500 });
  }
}
