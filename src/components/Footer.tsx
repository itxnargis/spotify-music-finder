import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiOutlineProfile } from 'react-icons/ai';
import { IoMailOutline } from 'react-icons/io5';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto text-center">
                <p className='text-xl font-medium'>Get In Touch</p>
                <ul className='flex flex-col text-gray-600 cursor-pointer'>
                    <li className="flex gap-2 justify-center">+91-212-456-7890</li>
                    <li className="flex gap-2 justify-center">
                        <IoMailOutline className="text-gray-600 hover:text-black" size={20} />
                        <a href="mailto:itxnargiskhatun@gmail.com" title="My Gmail account" aria-label="Gmail icon" className="text-gray-600 hover:text-black">
                            itxnargiskhatun@gmail.com
                        </a>
                    </li>
                    <li className="flex gap-2 justify-center">
                        <AiOutlineProfile className="text-gray-600 hover:text-black" size={20} />
                        <a
                            href="https://itxnargis.github.io/personal-portfolio/"
                            title="View my portfolio"
                            aria-label="Portfolio link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black"
                        >
                            View My Portfolio
                        </a>
                    </li>
                </ul>
                <p className='text-xl font-medium'>Follow Me</p>
                <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                    <li className="flex gap-2 justify-center">
                        <a href="https://github.com/itxnargis" title="Connect to Github" aria-label="Github icon" className="text-gray-600 hover:text-white">
                            <AiFillGithub size={20} />
                        </a>
                        <a href="https://x.com/81283nargis?s=09" title="My personal Twitter account" aria-label="Twitter icon" className="text-gray-600 hover:text-white">
                            <AiOutlineTwitter size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/" title="My LinkedIn account" aria-label="LinkedIn icon" className="text-gray-600 hover:text-white">
                            <AiFillLinkedin size={20} />
                        </a>
                    </li>
                </ul>
                <p>Developed by Nargis ❤️</p>
                <p>&copy; 2023 Audio Analyzer. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
