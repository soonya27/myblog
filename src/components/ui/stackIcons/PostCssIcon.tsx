import iconImg from '../../../../public/DevelopeSkillIcon/PostCSS_Logo.svg.png';
import Image from 'next/image';

export default function PostCssIcon() {
    return (
        <div className='bg-[#f4f2ed] w-full h-full rounded-lg flex justify-center items-center' >
            <Image src={iconImg} alt="sanity" width={30} height={30} className='w-3/5 h-3/5' />
        </div>
    );
}

