"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-mobile flex-col bg-brand">
      {/* Top area — brand logo + decorations */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6">
        {/* Decorative smile circles */}
        <Image
          src="/deco-smile-1.svg"
          alt=""
          width={58}
          height={55}
          className="absolute left-6 top-[15%] opacity-30"
          aria-hidden="true"
        />
        <Image
          src="/deco-smile-2.svg"
          alt=""
          width={69}
          height={66}
          className="absolute right-8 top-[30%] opacity-30"
          aria-hidden="true"
        />

        {/* Main logo */}
        <Image
          src="/logo-white.svg"
          alt="멍냥멍냥"
          width={140}
          height={140}
          priority
        />

        {/* Bottom cat peek decoration */}
        <Image
          src="/deco-cat-peek.svg"
          alt=""
          width={67}
          height={64}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-40"
          aria-hidden="true"
        />
      </div>

      {/* Bottom sheet — social login */}
      <div className="rounded-t-3xl bg-white px-6 pb-10 pt-6">
        <div className="mx-auto mb-6 h-1 w-[49px] rounded-full bg-gray-300" />

        <p className="mb-6 text-center text-body-sm font-semibold text-neutral-black-800">
          간편 로그인
        </p>

        {/* Social login circle buttons */}
        <div className="flex items-center justify-center gap-6">
          {/* Kakao */}
          <button
            type="button"
            className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-social-kakao transition-transform active:scale-95"
            aria-label="카카오 로그인"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C6.48 3 2 6.36 2 10.44c0 2.6 1.72 4.88 4.32 6.2l-1.1 4.02c-.08.3.26.54.52.36l4.8-3.18c.48.06.96.1 1.46.1 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"
                fill="#191919"
              />
            </svg>
          </button>

          {/* Naver */}
          <button
            type="button"
            className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-social-naver transition-transform active:scale-95"
            aria-label="네이버 로그인"
          >
            <span className="text-body-lg font-bold text-white">N</span>
          </button>

          {/* Google */}
          <button
            type="button"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-gray-300 bg-white transition-transform active:scale-95"
            aria-label="구글 로그인"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M19.8 10.2c0-.63-.06-1.25-.16-1.84H10.2v3.48h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.16z"
                fill="#4285F4"
              />
              <path
                d="M10.2 20c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H1.28v2.58A9.99 9.99 0 0010.2 20z"
                fill="#34A853"
              />
              <path
                d="M4.62 11.92A6.01 6.01 0 014.3 10c0-.66.12-1.3.32-1.92V5.5H1.28A9.99 9.99 0 000 10c0 1.62.38 3.14 1.08 4.5l3.54-2.58z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 3.96c1.46 0 2.78.5 3.82 1.5l2.86-2.86C15.14.98 12.9 0 10.2 0A9.99 9.99 0 001.28 5.5l3.34 2.58c.78-2.36 2.98-4.12 5.58-4.12z"
                fill="#EA4335"
              />
            </svg>
          </button>
        </div>

        {/* Skip login link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-caption text-gray-500 underline underline-offset-2"
          >
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
