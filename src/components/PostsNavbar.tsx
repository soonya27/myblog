import React from 'react';


type Props = {
    categories: string[];
    onClick: (category: string) => void;
    selected: string;
}
export default function PostsNavbar({ categories, onClick, selected }: Props) {
    return (
        <div className='pl-3'>
            <h3 className='py-2 font-bold'>Category</h3>
            <ul>
                {categories.map((list, idx) => (
                    <li key={idx} onClick={() => onClick(list)}
                        className={`${selected === list && "font-bold"}`}
                    >{list}</li>
                ))}
            </ul>
        </div>
    );
}

