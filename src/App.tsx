"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import questionbankData from "./data/questionBank.json";

interface Question {
  id: number;
  type: "input" | "select";
  title: string;
  options?: string[];
}

interface QuestionAnswer {
  title: string;
  answer: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = questionbankData as Question[];
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = async () => {
    if (!currentAnswer.trim()) return;

    const newAnswer: QuestionAnswer = {
      title: currentQuestion.title,
      answer: currentAnswer,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setCurrentAnswer("");
      setSelectedOption(null);
    } else {
      // Last question - submit to API
      setIsSubmitting(true);
      try {
        const response = await fetch(
          `https://form-backend-delta.vercel.app/api/v1/add/question`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ questionsAnswers: updatedAnswers }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
          console.log(data);
          setIsSubmitted(true);
        } else {
          console.error("Error:", response.statusText);
          // You can add error handling here
        }
      } catch (error) {
        console.error("Network error:", error);
        // You can add error handling here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      // Get the previous answer from the answers array
      const previousAnswer = answers[currentStep - 1];
      setCurrentAnswer(previousAnswer?.answer || "");
      setSelectedOption(null);
      // Remove the current step's answer from the array since we're going back
      setAnswers(answers.slice(0, currentStep - 1));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleOptionSelect = (option: string) => {
    if (selectedOption === option) {
      // If clicking the same option again, proceed to next question
      setCurrentAnswer(option);
      handleNext();
    } else {
      // First click - just select the option
      setSelectedOption(option);
      setCurrentAnswer(option);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gray-900"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
          >
            <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Thank you!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Your response has been recorded.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Counter */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 text-sm">
        {currentStep + 1} of {questions.length}
      </div>

      {/* Back Button */}
      {currentStep > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-gray-900"
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                {currentQuestion.title}
              </h1>

              <div className="space-y-4">
                {currentQuestion.type === "input" ? (
                  currentQuestion.title.length > 100 ? (
                    <Textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Answer"
                      className="text-base md:text-lg p-3 md:p-4 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] md:min-h-[120px]"
                      autoFocus
                      disabled={isSubmitting}
                    />
                  ) : (
                    <Input
                      type="text"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Answer"
                      className="text-base md:text-lg p-3 md:p-4 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      autoFocus
                      disabled={isSubmitting}
                    />
                  )
                ) : currentQuestion.type === "select" ? (
                  <div className="space-y-3">
                    {/* Click again message */}
                    {selectedOption && !isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-4"
                      >
                        <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                          Click your selection again to continue
                        </p>
                      </motion.div>
                    )}

                    {currentQuestion.options?.map((option, index) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isSubmitting}
                        className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ${
                          currentAnswer === option
                            ? "bg-blue-50 text-blue-700 border-blue-500"
                            : "bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                        } ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="text-base md:text-lg">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : null}

                {/* Next Button for input types */}
                {currentQuestion.type === "input" && (
                  <div className="flex justify-end mt-6 md:mt-8">
                    <Button
                      onClick={handleNext}
                      disabled={!currentAnswer.trim() || isSubmitting}
                      className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-6 py-2 md:py-3 text-base md:text-lg"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : currentStep === questions.length - 1
                        ? "Submit"
                        : "Next"}
                      {!isSubmitting && (
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Hint */}
      <div className="text-center text-gray-500 text-xs md:text-sm p-4">
        Press{" "}
        <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">Enter</kbd>{" "}
        to continue
      </div>
    </div>
  );
}

export default App;
