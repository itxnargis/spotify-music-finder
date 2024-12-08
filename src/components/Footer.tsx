import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiOutlineProfile } from 'react-icons/ai';
import { IoMailOutline } from 'react-icons/io5';

interface FooterProps {
    id?: string;
}

const Footer: React.FC<FooterProps> = ({ id }) => {
    return (
        <footer id={id} className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <IoMailOutline className="text-primary" />
                                <a href="mailto:itxnargiskhatun@gmail.com" className="hover:text-primary transition-colors">
                                    itxnargiskhatun@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <AiOutlineProfile className="text-primary" />
                                <a
                                    href="https://itxnargis.github.io/personal-portfolio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    View My Portfolio
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-4">Follow Me</h3>
                        <div className="flex gap-4">
                            <a href="https://github.com/itxnargis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <AiFillGithub size={24} />
                            </a>
                            <a href="https://x.com/81283nargis?s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <AiOutlineTwitter size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/nargis-khatun-4008ab2a9/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <AiFillLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold mb-4">About</h3>
                        <p className="text-gray-400">
                            Spotify Music Finder seamlessly connects your local music files to Spotify’s vast library. Identify tracks, play favorites, and discover new music effortlessly.
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-400">Developed with ❤️ by Nargis</p>
                    <p className="text-gray-500 mt-2">&copy; 2023 Spotify Music Finder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
