const Maintainance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-10 text-center">
        <div className="text-5xl mb-6">🚧</div>

        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          We’ll Be Back Soon
        </h1>

        <p className="text-slate-500 mb-6">
          Our system is currently under maintenance.
        </p>

        <div className="flex items-center justify-center gap-2 bg-slate-100 px-6 py-3 rounded-xl font-semibold text-slate-700 mb-6">
          <span>⏳</span>
          <p>We will come back in 90 days.</p>
        </div>

        <p className="text-sm text-slate-400">
          Thank you for your patience. We're improving your experience.
        </p>
      </div>
    </div>
  );
};

export default Maintainance;
