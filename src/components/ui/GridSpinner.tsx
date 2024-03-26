import dynamic from 'next/dynamic';
import { PulseLoader } from 'react-spinners';


//다이나믹하게 import 하는 방법..!!!
//-> ssr이 아니라 csr으로 변경
const GridLoader = dynamic(
    () => import('react-spinners').then(lib => lib.GridLoader),
    {
        ssr: false,
    }
)

export default function GridSpinner() {
    return (
        <PulseLoader color='#a3c7e1' />
    );
}

