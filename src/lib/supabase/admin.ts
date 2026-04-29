import { createClient } from '@supabase/supabase-js';

// service_role 키 사용. 서버 환경에서만 import 할 것.
// 어드민 라우트와 마이그레이션 스크립트에서만 사용.
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
