import iconImg from '../../../../public/DevelopeSkillIcon/sanity.svg';
import Image from 'next/image';

export default function SanityIcon() {
    return (
        <div className='bg-[#F03E2F] w-full h-full rounded-lg flex justify-center items-center' >
            <Image src={iconImg} alt="sanity" width={30} height={30} className='w-3/5 h-3/5' />
        </div>
    );
}

