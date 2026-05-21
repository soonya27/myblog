import { createClient } from '@/lib/supabase/server';
import { CategoryRow } from '@/model/category';

export async function getAllCategories(): Promise<CategoryRow[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) throw error;
    return (data ?? []) as CategoryRow[];
}
