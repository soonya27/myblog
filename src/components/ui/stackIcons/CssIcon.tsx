import iconImg from '../../../../public/DevelopeSkillIcon/CSS.svg';
import Image from 'next/image';

export default function CssIcon() {
    return (
        <Image src={iconImg} alt="css" width={30} height={30} className='w-full' />
    );
}

