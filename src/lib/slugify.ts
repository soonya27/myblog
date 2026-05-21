export function slugify(input: string): string {
    return (
        input
            .toLowerCase()
            .trim()
            // 영문/숫자/공백/하이픈만 남김 (한글은 URL에 적합하지 않아 사용자가 직접 입력)
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 100) || 'post'
    );
}
