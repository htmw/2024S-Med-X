import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';

function Loading(props) {

    const [loading, setLoading] = useState(true);
    const controls = useAnimation(); //using Animation hook

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) {
            controls.start({
                opacity: 1,
                transition: { duration: 1 }
            });
        } else {
            controls.start({
                opacity: 0,
                transition: { duration: 1 }
            });
        }
    }, [loading, controls]);

    return (
        <motion.div
            className="fixed bg-black top-0 left-0 w-full h-full flex justify-center items-center z-10"
            animate={controls}
        >
            <div className="p-4 rounded-md">
                <div className="flex justify-center">
                    <>
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 2 }
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 1.8, delay: 0.2 }
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 1.6, delay: 0.4 }
                            }}
                        />
                    </>
                </div>
            </div>
        </motion.div>
    );
}


export default Loading;
