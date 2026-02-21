// app/api/stories/route.ts
export const dynamic = 'force-dynamic'; // Забороняє Next.js кешувати цей запит, завжди беремо свіжі дані

import { isAxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { logErrorResponse } from '../_utils/utils';
import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';

// Твій GET запит на отримання всіх історій (feature/stories-get-all)
export async function GET(req: NextRequest) {
  try {
    // Витягуємо параметри пагінації та фільтрації з URL (наприклад: ?page=2&category=Mountains)
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '10';
    const category = searchParams.get('category') || '';

    // Робимо запит до нашого Node.js бекенду (api)
    const res = await api.get('/stories', {
      params: {
        page,
        perPage,
        category: category || undefined,
      },
    });

    // Повертаємо дані на фронтенд
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    // Обробка помилок
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// ... POST залишається для створення історій
export async function POST(request: Request) {
    // логіка запиту збережена без змін
    // ...
}