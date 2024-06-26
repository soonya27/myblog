import Profile from '@/components/Profile';
import Image from 'next/image';
import React from 'react';
import tonLogo from '../../../public/images/ton_logodown_src_type_03.png';
import LinkIcon from '@/components/ui/icons/LinkIcon';
import DownForwardIcon from '@/components/ui/icons/DownForwardIcon';

import postmanImg from '../../../public/DevelopeSkillIcon/Postman.svg';
import jsImg from '../../../public/DevelopeSkillIcon/JavaScript.svg';
import jqueryImg from '../../../public/DevelopeSkillIcon/JQuery.svg';
import bootstrapImg from '../../../public/DevelopeSkillIcon/Bootstrap.svg';
import htmlImg from '../../../public/DevelopeSkillIcon/HTML.svg';
import cssImg from '../../../public/DevelopeSkillIcon/CSS.svg';
import sanityImg from '../../../public/DevelopeSkillIcon/sanity.svg';
import nodeImg from '../../../public/DevelopeSkillIcon/NodeJS.svg';
import javaImg from '../../../public/DevelopeSkillIcon/Java-Light.svg';
import mysqlImg from '../../../public/DevelopeSkillIcon/MySQL-Light.svg';
import figmaImg from '../../../public/DevelopeSkillIcon/Figma.svg';
import xdImg from '../../../public/DevelopeSkillIcon/XD.svg';

import TypescriptIcon from '@/components/ui/stackIcons/TypescriptIcon';
import ReactIcon from '@/components/ui/stackIcons/ReactIcon';
import NextJsIcon from '@/components/ui/stackIcons/NextJsIcon';
import FirebaseIcon from '@/components/ui/stackIcons/FirebaseIcon';
import TailwindIcon from '@/components/ui/stackIcons/TailwindIcon';
import PostCssIcon from '@/components/ui/stackIcons/PostCssIcon';

import { AiFillGithub } from 'react-icons/ai';


const textStyle = `text-[#9a8383] text-base dark:text-slate-300`;

export default function AboutPage() {
    return (
        <section className='flex flex-col md:flex-row max-w-screen-2xl mx-auto'>
            <div className='w-full md:w-[38%] bg-main-pink text-center py-10 [&>p]:mb-4'>
                <Profile />
                <div className='px-3 [&>p]:leading-tight [&>p]:text-lg [&>p]:mb-2'>
                    <h2 className='text-3xl text-main-darkblue border-b-4 font-bold border-main-darkblue my-4 pb-2'>Profile</h2>
                    <strong>NAME</strong>
                    <p>편소영 (Pyeon So Yeong)</p>
                    <strong>AGE</strong>
                    <p>1995.11.02</p>
                    <strong>E-MAIL</strong>
                    <p>psykor48@gmail.com</p>
                    <strong>github</strong>
                    <p className='flex items-center justify-center'><a target="_blank" href="https://github.com/soonya27" rel="noopener noreferrer"
                        className='flex items-center ml-2 text-[#258ddb] text-lg'>
                        <AiFillGithub /><span className='ml-2 text-lg'>https://github.com/soonya27</span></a></p>
                    <strong>CONTACT</strong>
                    <p>010.2770.4952</p>
                </div>
                <div className='px-3 py-3 [&>ul>li>p]:text-sm [&>ul>li>p]:font-semibold [&>ul>li>p]:mt-1'>
                    <h2 className='text-3xl text-main-darkblue border-b-4 font-bold border-main-darkblue my-4 pb-2'>Skills</h2>
                    <strong className='block mb-3'>💻 Front End 💻</strong>
                    <ul className='grid grid-cols-5 gap-5 lg:grid-cols-5 md:grid-cols-4 [&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li>p]:w-full
    overflow: hidden; [&>li>p]:overflow-hidden [&>li>p]:whitespace-nowrap [&>li>p]:text-ellipsis [&>li>p]:break-all px-6'>
                        <li>
                            <Image src={htmlImg} alt="html" width={60} height={60} className='w-full ' />
                            <p>html</p>
                        </li>
                        <li>
                            <Image src={cssImg} alt="css" width={60} height={60} className='w-full ' />
                            <p>css</p>
                        </li>
                        <li>
                            <Image src={jqueryImg} alt="jquery" width={60} height={60} className='w-full ' />
                            <p>jquery</p>
                        </li>
                        <li>
                            <Image src={bootstrapImg} alt="bootstrap" width={60} height={60} className='w-full ' />
                            <p>bootstrap</p>
                        </li>
                        <li>
                            <TailwindIcon />
                            <p>tailwindCss</p>
                        </li>
                        <li>
                            <PostCssIcon />
                            <p>PostCss</p>
                        </li>
                        <li>
                            <Image src={jsImg} alt="Javascript" width={60} height={60} className='w-full ' />
                            <p>Javascript</p>
                        </li>
                        <li>
                            <TypescriptIcon />
                            <p>typescript</p>
                        </li>
                        <li>
                            <ReactIcon />
                            <p>react</p>
                        </li>
                        <li>
                            <NextJsIcon />
                            <p>nextJs</p>
                        </li>
                    </ul>

                    <strong className='block my-2 mt-4'>🖥 back End 🖥</strong>
                    <ul className='grid grid-cols-5 gap-5  lg:grid-cols-5 md:grid-cols-4 [&>li]:flex [&>li]:flex-col [&>li]:items-center px-6'>
                        <li>
                            <FirebaseIcon />
                            <p>firebase</p>
                        </li>
                        <li>
                            <div className='bg-[#F03E2F] w-full h-full rounded-xl flex justify-center items-center' >
                                <Image src={sanityImg} alt="sanity" width={30} height={30} className='w-3/5 h-3/5' />
                            </div>
                            <p>sanity</p>
                        </li>
                    </ul>

                    <strong className='block my-2 mt-4'>🍂 Communication 🍂</strong>
                    <ul className='grid grid-cols-5 gap-5  lg:grid-cols-5 md:grid-cols-4 [&>li]:flex [&>li]:flex-col [&>li]:items-center px-6'>
                        <li>
                            <Image src={xdImg} alt="xd" width={60} height={60} className='w-full ' />
                            <p>xd</p>
                        </li>
                        <li>
                            <Image src={figmaImg} alt="figma" width={30} height={30} className='w-full' />
                            <p>figma</p>
                        </li>
                        <li>
                            <Image src={postmanImg} alt="figma" width={30} height={30} className='w-full' />
                            <p>postman</p>
                        </li>
                    </ul>

                    <strong className='block my-2 mt-4'>📚 Studying.. 📚</strong>
                    <ul className='grid grid-cols-5 gap-5  lg:grid-cols-5 md:grid-cols-4 [&>li]:flex [&>li]:flex-col [&>li]:items-center px-6'>
                        <li>
                            <Image src={nodeImg} alt="xd" width={60} height={60} className='w-full ' />
                            <p>node.js</p>
                        </li>
                        <li>
                            <Image src={javaImg} alt="figma" width={30} height={30} className='w-full' />
                            <p>java</p>
                        </li>
                        <li>
                            <Image src={mysqlImg} alt="figma" width={30} height={30} className='w-full' />
                            <p>mysql</p>
                        </li>
                    </ul>

                </div>

                <div className='px-3 [&>p]:leading-tight [&>p]:text-sm [&>p]:mb-2'>
                    <h2 className='text-3xl text-main-darkblue border-b-4 font-bold border-main-darkblue my-4 pb-2'>Introduce</h2>
                    <p className='text-left p-2 text-sm'>안녕하세요, 프런트엔드 신입 개발자 편소영입니다.<br />
                        저는 퍼블리셔로 3년간 근무하며 HTML, CSS, JavaScript를 기본으로 하는 웹 개발 업무를 맡아왔습니다.<br />
                        특히 AJAX를 이용한 API 연결을 통해 프런트엔드 업무를 함께 수행하면서 화면의 기능을 구현하는 다양한 프로젝트 경험을 쌓았습니다. Java Spring 기반 환경에서 JSP를 활용한 퍼블리싱 및 프런트엔드 업무에도 익숙하며, 아주 간단한 SQL 쿼리 작성부터 Java 파일 작성까지의 경험도 보유하고 있습니다.<br />
                        <br />
                        최근에는 프런트엔드 프레임워크인 React와 Next.js를 학습하며 개인 프로젝트 세 개를 완성했습니다. Firebase와 Sanity를 이용하여 백엔드 서버를 구성하였고, Next.js를 사용하여 Node 환경의 API를 만들어 프로젝트를 진행했습니다. 이를 통해 최신 웹 개발 트렌드와 기술을 익히고, 실무에 적용할 수 있는 능력을 키웠습니다.<br />
                        <br />
                        저는 이러한 경험을 바탕으로 프런트엔드 개발자로서 회사에 기여하고자 합니다. 저의 개인 포트폴리오 사이트는 디자인부터 직접 구성하여 만들었으며, 이 과정에서 사용자 경험과 인터페이스의 중요성을 깊이 이해하게 되었습니다. 항상 공부하며 발전하는 개발자가 되기 위해 노력하고 있으며, 끊임없이 변화하는 기술 트렌드에 맞춰 제 역량을 키워가고 있습니다.<br />
                        <br />
                        항상 새로운 것을 배우고 도전하는 자세로, 팀과 함께 협력하여 최고의 결과를 만들어내는 개발자가 되겠습니다.<br />
                        감사합니다.
                    </p>
                </div>
            </div>
            <div className='lg:w-4/6 p-7 md:p-12 text-base [&>dl>dd>p]:dark:text-slate-400'>
                <dl>
                    <dt className='text-2xl text-main-darkblue border-b-4 font-bold border-main-darkblue mb-4'>Education</dt>
                    <dd className={`${ddStyle}`}><span className='text-main-darkblue font-bold mr-3'>2019</span>
                        <p>세종대학교 회화과(서양화과) 졸업</p>
                    </dd>
                    <dt className='text-2xl text-main-darkblue border-b-4 font-bold border-main-darkblue mb-4 mt-5'>Career</dt>
                    <dd className={`${ddStyle}`}><span className='text-main-darkblue font-bold mr-3'>2019</span>
                        <p>광진구 공공근로 벽화사업</p>
                    </dd>
                    {/* <dd><span className='text-main-darkblue font-bold'>2020</span>
                        <p>개인 포트폴리오</p>
                        <p className="">
                            <span className="link">
                                <a href="https://soonya27.github.io/webPortfolio001/index.html" target="_blank"> url</a>
                            </span>
                            <span className="link">
                                <a href="https://soonya27.github.io/webPortfolio002/" target="_blank"> url</a>
                            </span>
                        </p>
                    </dd> */}
                    <dd className={`${ddStyle}`}>
                        <span className='text-main-darkblue font-bold mr-3'>2021<br />~<br /> 2023</span>
                        <div className="flex-auto">
                            <div className='flex justify-center items-center flex-col md:flex-row mb-5 pb-5 border-b'>
                                <div className='w-40 h-40 rounded-full overflow-hidden border flex justify-center items-center p-5 mt-2 mb-2'>
                                    <Image src={tonLogo} alt="tonMediaLogo" className='' />
                                </div>
                                <div className='ml-0 md:ml-3'>
                                    <p className='font-extrabold text-xl text-left md:text-center dark:text-white'>(주) 티온미디어</p>
                                    <span className='text-[#6c757d] text-left md:text-center block'>2021.04 ~ 2023.12</span>
                                    <p className='flex items-center'><a target="_blank" href="https://www.t-onmedia.com/" rel="noopener noreferrer"
                                        className='flex items-center ml-2 text-[#258ddb] text-sm'>
                                        <LinkIcon /><span className='ml-2'>home page</span></a></p>
                                </div>
                            </div>

                            <ul className='mt-3 px-0 md:px-8 [&>li]:mb-5 [&>li>span]:text-[#6c757d] [&>li>span]:text-md [&>li>p]:mt-1 [&>li>strong]:font-semibold [&>li>strong]:mr-2 [&>li>strong]:dark:text-white [&>li>span]:ml-5 [&>li>span]:block md:[&>li>span]:inline-block md:[&>li>span]:ml-0 '>
                                <li><strong>▎ 21.4-5 오즈의 타로 어드민</strong> <span>리디자인 퍼블리싱(100%)</span>
                                    <p className={textStyle}>- 티온미디어의 자체 서비스 오즈의 타로 어드민사이트 리디자인, 퍼블리싱
                                        <br />- pc, mobile 반응형적용 <br />- 기존 이미지 소스 가공하여 메뉴바, 배경이미지 적용
                                        <br />- ux에 맞게 부분적으로 기획수정 요청하여 button의 위치나 종류 수정
                                    </p>
                                </li>
                                <li><strong>▎ 21.5-6 뷰티크 어드민</strong> <span>퍼블리싱(100%)</span>
                                    <p className={textStyle}>- 부트스트랩 기반 어드민 사이트 디자인 및 퍼블리싱 수정
                                        <br />- 반응형 어드민 메뉴바, 전체 레이아웃 작성
                                        <br />- 디자인시안 없이 간단한 디자인 작업하며 퍼블리싱
                                    </p>
                                </li>
                                <li><strong>▎ 21.6 오즈의 타로 이벤트 페이지 (스킨톡)</strong> <span>퍼블리싱, 프런트개발(100%)</span>
                                    <p className={textStyle}>- 타로카드 스킨톡 협업 이벤트 페이지<br />
                                        - 사용자 정보 form데이터 유효성 검사 및 전송 프런트 개발
                                    </p>
                                </li>
                                <li><strong>▎ 21.6 오즈의 타로 이벤트 페이지 (타로카드)</strong> <span>퍼블리싱, 프런트개발(100%)</span>
                                    <p className={textStyle}>- 타로카드 이벤트 페이지<br />
                                        - 사용자 정보 form데이터 유효성 검사 및 전송 프런트 개발
                                        <br />- 특정 단어를 입력하는 input의 이벤트 루트 개발(자동 focus, 자음 미리보기)
                                    </p>
                                </li>
                                <li><strong>▎ 21.6 오즈의 타로 이벤트 페이지 (플렉싱)</strong> <span>퍼블리싱(100%)</span>
                                </li>
                                <li><strong>▎ 21.7-12 마파씨 (MAPHACY) </strong><span>퍼블리싱(100%), 프런트개발(85%)</span>
                                    <p className={textStyle}>- pc, mobile 반응형 하이브리드 웹앱 퍼블리싱<br />
                                        - 프런트 개발 협업<br />
                                        - 약사와의 1대1 상담 채팅 기능 페이지<br />
                                        - 질문 답변이 가능한 지식인 게시글 글쓰기
                                        <br />- 커뮤니티 페이지<br />
                                        - 영양제 목록과 영양제관련 후기 및 댓글 작성
                                        - 프로필 수정 및 이미지 업로드
                                    </p>
                                    <p className='flex items-center'><DownForwardIcon /><a target="_blank" href="https://www.t-onmedia.com/?portfolio=ydy-mapacy" rel="noopener noreferrer"
                                        className='flex items-center ml-2 text-[#258ddb] text-sm'>
                                        <LinkIcon /><span className='ml-2'>참고 링크</span></a></p>
                                </li>
                                <li><strong>▎ 22.1-6 케어가드 모바일 웹앱</strong> <span>퍼블리싱(70%), 프런트개발(60%)</span>
                                    <p className={textStyle}>- 케어가드 모바일 하이브리드 퍼블리싱 협업<br />
                                        - 프런트 개발 협업<br />
                                        - 노인장기요양 관리 플랫폼 웹앱 어플리케이션<br />
                                        - 사회복지사/요양보호사/보호자/수급자를 위한 PC Web 서비스와 Mobile 서비스 제작
                                    </p>
                                    <p className='flex items-center'><DownForwardIcon /><a target="_blank" href="https://www.t-onmedia.com/?portfolio=%ec%bc%80%ec%96%b4%ea%b0%80%eb%93%9c" rel="noopener noreferrer"
                                        className='flex items-center ml-2 text-[#258ddb] text-sm'>
                                        <LinkIcon /><span className='ml-2'>참고 링크</span></a></p>
                                </li>
                                <li><strong>▎ 22.6-8 케어가드 어드민 </strong><span>리디자인 퍼블리싱(50%), 프런트개발(30%), 서버개발(10%)</span>
                                    <p className={textStyle}>- 부트스트랩 기반 어드민 사이트 디자인 수정 퍼블리싱 협업<br />
                                        - 프런트 개발 협업<br />
                                        - 주야간보호센터와 방문요양센터의 직원 관리 및 센터 관리 기능 제공<br />
                                        - 일부 서버개발 협업 (java springMVC JPA )
                                    </p>
                                </li>
                                <li><strong>▎ 22.8-9 케어가드 브랜드 사이트 </strong><span>퍼블리싱(100%)</span>
                                    <p className={textStyle}>- 부트스트랩 기반 어드민 사이트 디자인 수정 퍼블리싱 협업<br />
                                        - 케어가드 소개, 서비스, 이용방법에 대한 소개 브랜드 사이트<br />
                                    </p>
                                </li>
                                <li><strong>▎ 22.10-12 장흥진균버섯검색 사이트</strong><span>퍼블리싱(20%), 프런트개발(40%)</span>
                                    <p className={textStyle}>
                                        - 장흥군 버섯 산업연구소의 진균DBWebPage개발 진행<br />
                                        - 퍼블리싱 2인 보조 협업<br />
                                        - 프런트 개발 협업<br />
                                    </p>
                                </li>
                                <li><strong>▎ 23.1-3 하이이미지 모바일(관리자용) </strong><span>퍼블리싱(100%), 프런트개발(100%)</span>
                                    <p className={textStyle}>
                                        - 모바일 관리자 서비스를 통한 판독의 관리 및 업무 관리 기능 제공<br />
                                        - 판독 목록 데이터테이블 제공<br />
                                    </p>
                                    <p className='flex items-center'><DownForwardIcon /><a target="_blank" href="https://www.t-onmedia.com/?portfolio=ahealthz-%ec%9b%90%ea%b2%a9%ed%8c%90%eb%8f%85%ec%84%9c%eb%b9%84%ec%8a%a4-hi-image" rel="noopener noreferrer"
                                        className='flex items-center ml-2 text-[#258ddb] text-sm'>
                                        <LinkIcon /><span className='ml-2'>참고 링크</span></a></p>
                                </li>
                                <li><strong>▎ 23.3 하이이미지 어드민 (front/admin)</strong> <span>리디자인 퍼블리싱(60%), 프런트개발(10%)</span>
                                    <p className={textStyle}>
                                        - 디자인 수정 및 반응형 적용<br />
                                        - 일부 기능 프런트 개발 협업
                                    </p>
                                </li>
                                <li><strong>▎ 23.4 하이이미지 브랜드 사이트 </strong><span>퍼블리싱(100%), 프런트개발(100%)</span>
                                    <p className={textStyle}>
                                        - 하이이미지 소개 브랜드 사이트 퍼블리싱<br />
                                        - 문의하기 기능 프런트 개발
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </dl>

            </div>
        </section >
    );
}

const ddStyle = `flex mb-3`;

