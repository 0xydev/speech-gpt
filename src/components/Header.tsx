import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
    return (
        <nav>
            <ul className="flex justify-center gap-x-4 items-center">
                <motion.li
                    transition={{ delay: 0.1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-12 h-12 rounded-full relative overflow-hidden">
                    <Image
                        src="/pozitif.png"
                        alt="Pozitif Kız"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.li>
                <motion.li
                    transition={{ delay: 0.15 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-14 h-14 rounded-full relative overflow-hidden">
                    <Image
                        src="/gergin.png"
                        alt="Gergin Adam"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.li>
                <motion.li
                    transition={{ delay: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-16 h-16 rounded-full relative overflow-hidden">
                    <Image
                        src="/yalanci.png"
                        alt="Yalancı Adam"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.li>
                <motion.li
                    transition={{ delay: 0.25 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-14 h-14 rounded-full relative overflow-hidden">
                    <Image
                        src="/sair.png"
                        alt="Şair Adam"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.li>
                <motion.li
                    transition={{ delay: 0.3 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-sky-800 w-12 h-12 rounded-full relative overflow-hidden">
                    <Image
                        src="/merakli.png"
                        alt="Meraklı Adam"
                        layout="fill"
                        objectFit="cover"
                    />
                </motion.li>
            </ul>
        </nav>
    );
}

export default Header;
