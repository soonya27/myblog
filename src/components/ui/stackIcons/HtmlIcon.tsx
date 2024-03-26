import iconImg from '../../../../public/DevelopeSkillIcon/HTML.svg';
import Image from 'next/image';

export default function HtmlIcon() {
    return (
        <Image src={iconImg} alt="html" width={30} height={30} className='w-full' />
    );
}

