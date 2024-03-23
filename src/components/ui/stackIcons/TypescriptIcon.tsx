import iconImg from '../../../../public/DevelopeSkillIcon/TypeScript.svg';
import Image from 'next/image';

export default function TypescriptIcon() {
    return (
        <Image src={iconImg} alt="typescript" width={30} height={30} className='w-full' />
    );
}

