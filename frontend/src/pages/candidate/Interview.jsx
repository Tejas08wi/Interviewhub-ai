import { useEffect, useState } from "react";
import InterviewGenerateForm from "../../components/forms/InterviewGenerateForm";
import interviewService from "../../services/interviewService";

function Interview() {
  const [interview, setInterview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  // Load history automatically when the component mounts
  useEffect(() => {
    loadInterviewHistory();
  }, []);

  const handleGenerateInterview = async (formData) => {
    setLoading(true);
    setMessage("");
    setInterview(null);
    setEvaluation(null); // Clear previous evaluation views on new generation

    try {
      const response = await interviewService.generateInterview(formData);
      setInterview(response.data.data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to generate interview.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmitInterview = async () => {
    if (!interview) return;

    const requestData = {
      sessionId: interview.sessionId,
      answers: interview.questions.map((question) => ({
        questionId: question.questionId,
        candidateAnswer: answers[question.questionId] || "",
      })),
    };

    try {
      const response = await interviewService.submitInterview(requestData);
      setMessage(response.data.message);
      loadInterviewHistory(); // Refresh history list after a submission
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to submit interview.",
      );
    }
  };

  const loadInterviewHistory = async () => {
    try {
      const response = await interviewService.getInterviewHistory();
      setHistory(response.data.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to load interview history.",
      );
    }
  };

  const viewEvaluation = async (sessionId) => {
    try {
      const response = await interviewService.getInterviewEvaluation(sessionId);
      setEvaluation(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to load evaluation.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          AI Interview Simulator
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure a role, generate personalized, curriculum-based interview
          questions, and receive automated performance scoring.
        </p>
      </div>

      {/* Generation Form (Wrapped inside a beautiful layout block) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
          <svg
            className="text-blue-500"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Configure Live Simulator
        </h2>
        <InterviewGenerateForm onSubmit={handleGenerateInterview} />
      </div>

      {/* Loading Status Indicator */}
      {loading && (
        <div className="flex items-center gap-3 p-4 bg-blue-50/50 border border-blue-100/60 text-blue-800 rounded-2xl text-sm font-medium animate-pulse">
          <svg
            className="animate-spin text-blue-500 shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeDasharray="30 10"
              stroke="transparent"
            />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
          </svg>
          <span>
            Generating AI interview questions custom to your profile...
          </span>
        </div>
      )}

      {/* Alert Toast Notification */}
      {message && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl text-sm font-medium">
          <svg
            className="text-emerald-500 shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* ACTIVE INTERVIEW PANEL */}
      {interview && (
        <div className="space-y-6">
          {/* Active Session Meta Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3 uppercase tracking-wider">
              🔴 Active Practice Session
            </span>
            <h2 className="text-xl font-bold tracking-tight mb-4 text-white">
              Interview Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider font-semibold">
                  Job Role
                </span>
                <span className="font-bold text-white text-sm">
                  {interview.jobRole}
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider font-semibold">
                  Difficulty
                </span>
                <span className="font-bold text-white text-sm capitalize">
                  {interview.difficulty}
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider font-semibold">
                  Total Questions
                </span>
                <span className="font-bold text-white text-sm">
                  {interview.numberOfQuestions}
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1 uppercase tracking-wider font-semibold">
                  Session Token
                </span>
                <span className="font-bold text-slate-300 font-mono text-sm truncate block">
                  {interview.sessionId}
                </span>
              </div>
            </div>
          </div>

          {/* Question Sequence List */}
          <div className="space-y-6">
            {interview.questions.map((question) => (
              <div
                key={question.questionId}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-extrabold">
                      {question.questionNumber}
                    </span>
                    Question {question.questionNumber}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Category:{" "}
                    <span className="text-slate-800">{question.category}</span>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    AI Prompt
                  </label>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {question.question}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Answer
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Type your structured response here..."
                    value={answers[question.questionId] || ""}
                    onChange={(event) =>
                      handleAnswerChange(
                        question.questionId,
                        event.target.value,
                      )
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Block */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmitInterview}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Submit Interview Responses
            </button>
          </div>
        </div>
      )}

      {/* SELECTED EVALUATION PANEL */}
      {evaluation && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Performance Index
              </span>
              <h2 className="text-lg font-bold text-slate-800 mt-0.5">
                Interview Evaluation
              </h2>
            </div>
            <div className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100 font-mono">
              Session: {evaluation.sessionId ? String(evaluation.sessionId).slice(0, 8) : "N/A"}...
            </div>
          </div>

          {/* Score Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-800 block">
                  Overall Score
                </span>
                <span className="text-xs text-emerald-600">
                  Weighted average
                </span>
              </div>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {evaluation.overallScore}
              </span>
            </div>

            <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-800 block">
                  Technical Score
                </span>
                <span className="text-xs text-blue-600">Logic & accuracy</span>
              </div>
              <span className="text-2xl font-black text-blue-600 font-mono">
                {evaluation.technicalScore}
              </span>
            </div>

            <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-indigo-800 block">
                  Communication
                </span>
                <span className="text-xs text-indigo-600">
                  Articulation & tone
                </span>
              </div>
              <span className="text-2xl font-black text-indigo-600 font-mono">
                {evaluation.communicationScore}
              </span>
            </div>
          </div>

          {/* Deep-dive Feedback Text Blocks */}
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Strengths:
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {evaluation.strengths}
              </p>
            </div>

            <div className="bg-rose-50/30 border border-rose-100/50 rounded-xl p-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Areas for Improvement:
              </p>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                {evaluation.weaknesses}
              </p>
            </div>

            <div className="bg-amber-50/30 border border-amber-100/50 rounded-xl p-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Suggestions:
              </p>
              <p className="text-sm text-amber-700 leading-relaxed font-medium">
                {evaluation.suggestions}
              </p>
            </div>

            <div className="bg-blue-50/30 border border-blue-100/50 rounded-xl p-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Final Feedback Summary:
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {evaluation.finalFeedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* INTERVIEW SESSIONS HISTORY LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          {/* Clock History SVG */}
          <svg
            className="text-slate-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Previous Sessions History
        </h2>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 text-sm font-medium">
              No prior interview sessions found. Generate your first above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.sessionId}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {item.jobRole}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-lg">
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-slate-400 font-medium">
                    <p className="truncate">
                      <span className="font-semibold text-slate-500">
                        Session ID:
                      </span>{" "}
                      {item.sessionId
                        ? String(item.sessionId).slice(0, 8)
                        : "N/A"}
                      ...
                    </p>
                    <p>
                      <span className="font-semibold text-slate-500">
                        Total Questions:
                      </span>{" "}
                      {item.totalQuestions}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-500">
                        Date:
                      </span>{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-start border-t border-slate-50 pt-3 md:pt-0 md:border-t-0">
                  <div className="text-right pr-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Overall Score
                    </span>
                    <span className="text-lg font-black text-slate-800 font-mono">
                      {item.overallScore || "N/A"}
                    </span>
                  </div>

                  <button
                    onClick={() => viewEvaluation(item.sessionId)}
                    className="inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50/20 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                  >
                    {/* View/Eye SVG */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Evaluation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;
