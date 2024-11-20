import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function GET() {
  try {
    const date = new Date();
    const tokyoDate = utcToZonedTime(date, 'Asia/Tokyo');
    const formattedDate = format(tokyoDate, 'yyyy年MM月dd日');
    
    return new NextResponse(JSON.stringify({ date: formattedDate }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to format date' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
