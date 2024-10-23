import { useState } from "react"
import "../../public/CSS/FAQ.css"

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "What is Bon Voyage?",
      answer:
        "Bon Voyage is a platform for sharing travel journals and experiences with a community of travelers.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Register' button and filling out the form.",
    },
    {
      question: "Can I edit my profile?",
      answer:
        "Yes, you can edit your profile anytime by navigating to your profile and click to edit.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Currently, we only have a web version, but we plan to develop a mobile app in the future.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach out to our support team via this number +973 32333689",
    },
    {
      question: "Are there any fees to use Bon Voyage?",
      answer:
        "No, Bon Voyage is completely free to use! You can create an account and start sharing your travel experiences without any charges.",
    },
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQs
