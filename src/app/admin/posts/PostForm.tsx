'use client';

import { CategoryRow } from '@/model/category';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export type PostFormDefaults = {
    slug: string;
    title: string;
    description: string;
    content: string;
    category_id: string;
    stacks: string[];
    featured: boolean;
    is_public: boolean;
    image_url: string | null;
    published_at: string;
};

type Props = {
    categories: CategoryRow[];
    action: (formData: FormData) => Promise<void>;
    defaults?: PostFormDefaults;
    submitLabel?: string;
};

const today = () => new Date().toISOString().slice(0, 10);

export default function PostForm({
    categories,
    action,
    defaults,
    submitLabel = '저장',
}: Props) {
    const [content, setContent] = useState<string>(defaults?.content ?? '');
    const [submitting, setSubmitting] = useState(false);

    const existingImageUrl = defaults?.image_url ?? '';
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        existingImageUrl || null
    );
    const [removeImage, setRemoveImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        if (file) {
            const url = URL.createObjectURL(file);
            objectUrlRef.current = url;
            setPreviewUrl(url);
            setRemoveImage(false);
        } else {
            objectUrlRef.current = null;
            setPreviewUrl(existingImageUrl || null);
        }
    }

    function handleClearImage() {
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        setPreviewUrl(null);
        setRemoveImage(true);
    }

    return (
        <form
            action={async (fd) => {
                setSubmitting(true);
                try {
                    await action(fd);
                } finally {
                    setSubmitting(false);
                }
            }}
            className='flex flex-col gap-4'
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <label className='flex flex-col gap-1 text-sm md:col-span-2'>
                    <span className='font-semibold'>
                        제목 <span className='text-red-500'>*</span>
                    </span>
                    <input
                        name='title'
                        defaultValue={defaults?.title}
                        required
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    />
                </label>

                <label className='flex flex-col gap-1 text-sm md:col-span-2'>
                    <span className='font-semibold'>
                        slug
                        <span className='ml-2 font-normal text-slate-400'>
                            비워두면 제목에서 자동 생성 (영문/숫자만)
                        </span>
                    </span>
                    <input
                        name='slug'
                        defaultValue={defaults?.slug}
                        placeholder='my-new-post'
                        className='px-3 py-2 border rounded font-mono text-sm dark:bg-slate-900 dark:border-slate-600'
                    />
                </label>

                <label className='flex flex-col gap-1 text-sm md:col-span-2'>
                    <span className='font-semibold'>
                        설명 <span className='text-red-500'>*</span>
                    </span>
                    <textarea
                        name='description'
                        defaultValue={defaults?.description}
                        required
                        rows={2}
                        className='px-3 py-2 border rounded resize-y dark:bg-slate-900 dark:border-slate-600'
                    />
                </label>

                <label className='flex flex-col gap-1 text-sm'>
                    <span className='font-semibold'>
                        카테고리 <span className='text-red-500'>*</span>
                    </span>
                    <select
                        name='category_id'
                        defaultValue={defaults?.category_id ?? categories[0]?.id}
                        required
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    >
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className='flex flex-col gap-1 text-sm'>
                    <span className='font-semibold'>작성일</span>
                    <input
                        type='date'
                        name='published_at'
                        defaultValue={defaults?.published_at ?? today()}
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    />
                </label>

                <label className='flex flex-col gap-1 text-sm md:col-span-2'>
                    <span className='font-semibold'>
                        스택
                        <span className='ml-2 font-normal text-slate-400'>
                            쉼표로 구분 (예: React, NextJs, TailwindCss)
                        </span>
                    </span>
                    <input
                        name='stacks'
                        defaultValue={defaults?.stacks.join(', ')}
                        className='px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-600'
                    />
                </label>

                <label className='flex items-center gap-2 text-sm'>
                    <input
                        type='checkbox'
                        name='is_public'
                        defaultChecked={defaults?.is_public ?? true}
                    />
                    <span>공개 (체크 해제 시 비공개로 저장)</span>
                </label>

                <label className='flex items-center gap-2 text-sm'>
                    <input
                        type='checkbox'
                        name='featured'
                        defaultChecked={defaults?.featured ?? false}
                    />
                    <span>대표 글 (홈 FEATURED 영역 노출)</span>
                </label>
            </div>

            <div className='flex flex-col gap-2 text-sm'>
                <span className='font-semibold'>
                    대표 이미지
                    <span className='ml-2 font-normal text-slate-400'>
                        선택하지 않으면 기본 이미지가 표시됩니다
                    </span>
                </span>

                <input
                    ref={fileInputRef}
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='block text-sm file:mr-3 file:px-3 file:py-1.5 file:border-0 file:rounded file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 dark:file:bg-slate-700 dark:file:text-slate-200'
                />

                <input
                    type='hidden'
                    name='existing_image_url'
                    value={removeImage ? '' : existingImageUrl}
                />
                <input
                    type='hidden'
                    name='remove_image'
                    value={removeImage ? 'on' : ''}
                />

                {previewUrl && (
                    <div className='flex items-start gap-3'>
                        <div className='relative w-48 h-32 rounded overflow-hidden border dark:border-slate-700'>
                            {/* 외부 URL일 수 있어 next/image의 unoptimized 사용 */}
                            {previewUrl.startsWith('blob:') ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={previewUrl}
                                    alt='미리보기'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <Image
                                    src={previewUrl}
                                    alt='미리보기'
                                    fill
                                    className='object-cover'
                                />
                            )}
                        </div>
                        <button
                            type='button'
                            onClick={handleClearImage}
                            className='px-2 py-1 border rounded text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-slate-700'
                        >
                            이미지 제거
                        </button>
                    </div>
                )}
            </div>

            <div className='flex flex-col gap-1 text-sm'>
                <span className='font-semibold'>
                    본문 (Markdown) <span className='text-red-500'>*</span>
                </span>
                <div data-color-mode='light'>
                    <MDEditor
                        value={content}
                        onChange={(v) => setContent(v ?? '')}
                        height={500}
                        preview='live'
                    />
                </div>
                <input type='hidden' name='content' value={content} />
            </div>

            <div className='flex justify-end gap-2'>
                <button
                    type='submit'
                    disabled={submitting}
                    className='px-4 py-2 rounded bg-slate-900 text-white disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900'
                >
                    {submitting ? '저장 중...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
