import React, { useState } from 'react';
import { X, Phone, Lock, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep('OTP');
    }, 1000);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    onSuccess(phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pizza-dark/70 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-pizza-orange/10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-pizza-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pizza-crimson to-pizza-orange text-white text-3xl font-black flex items-center justify-center mx-auto shadow-pizza-lg">
            🍕
          </div>
          <h2 className="text-2xl font-black text-pizza-dark">
            {step === 'PHONE' ? 'Sign In / Sign Up' : 'Verify Mobile OTP'}
          </h2>
          <p className="text-xs text-pizza-muted">
            {step === 'PHONE' 
              ? 'Enter your mobile number to get instant OTP access' 
              : `Enter the 6-digit OTP sent to +91 ${phone}`}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-pizza-crimson/10 border border-pizza-crimson/30 text-pizza-crimson text-xs font-bold text-center">
            {error}
          </div>
        )}

        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-pizza-dark uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-pizza-dark">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  className="w-full pl-14 pr-4 py-3 rounded-2xl border border-gray-300 text-sm font-bold text-pizza-dark focus:outline-none focus:border-pizza-orange focus:ring-2 focus:ring-pizza-orange/20"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-extrabold text-sm shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 rounded-2xl border-2 border-gray-200 text-center font-black text-xl text-pizza-dark focus:border-pizza-orange focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-pizza-orange to-pizza-crimson text-white font-extrabold text-sm shadow-pizza-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Verify & Continue
            </button>

            <button
              type="button"
              onClick={() => setStep('PHONE')}
              className="w-full text-xs text-pizza-muted hover:text-pizza-orange font-bold text-center block"
            >
              Change Mobile Number
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
