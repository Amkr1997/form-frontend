"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
  description?: string;
  buttonText?: string;
  estimatedTime?: string;
}

export default function StartScreen({
  onStart,
  description = "Thank you for choosing us to be a part of your digital journey! To kickstart the adventure, we'd love to get to know you better. Please take a moment to share some information with us.",
  buttonText = "Start",
  estimatedTime = "5",
}: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo - Make it bigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          {/* Large M with Arrow */}
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="text-8xl md:text-9xl font-bold text-black relative">
                M{/* Arrow */}
                <div className="absolute -top-4 -right-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-black"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Company Name Below Logo */}
            <div className="text-2xl font-bold text-black tracking-wider">
              MESSOLD TECHNOLOGIES
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-gray-600 mb-16 leading-relaxed max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Time Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-8"
        >
          <Clock className="w-4 h-4" />
          <span>Takes {estimatedTime} minutes</span>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-lg transition-colors text-lg"
          >
            {buttonText}
          </motion.button>

          <span className="text-gray-400 text-sm">
            press{" "}
            <kbd className="px-2 py-1 bg-gray-200 rounded text-gray-600 font-mono text-xs">
              Enter ↵
            </kbd>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
