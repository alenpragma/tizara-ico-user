import React, { useState, useRef, useEffect } from 'react';

interface AppProps {
  validate: (isValid: boolean) => void;
  setError: (message: string) => void;
  validateCapthca: (message: string) => void;
}

export const Captcha: React.FC<any> = ({
  setCaptcha,
  enteredVal,
  setEnteredVal,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    redraw();
  }, []);

  // small word
  const drawCaptchaBackground = (ctx: CanvasRenderingContext2D) => {
    for (let x = 0; x < 15; x++) {
      let p1 = Math.random() * 125;
      let p2 = Math.random() * 30;
      ctx.beginPath();
      let hue = Math.random() * 360;
      ctx.strokeStyle = `hsl(${hue},100%,50%)`;
      ctx.moveTo(p1, p2);
      let s = 5 - Math.random() * 5;
      ctx.lineTo(p1 + s, p2 + s);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      hue = Math.random() * 360;
      ctx.strokeStyle = `hsl(${hue},100%,50%)`;
      ctx.moveTo(p1 - 3, p2 + 3);
      s = 5 - Math.random() * 5;
      ctx.arc(p1, p2, 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
    }
  };

  const drawCaptchaFace = (ctx: CanvasRenderingContext2D) => {
    let x = 0;
    let y = 25;
    let str = '';
    // 5 character
    for (let i = 0; i < 5; i++) {
      ctx.save();
      x = 8 + i * 18;

      let hue = Math.random() * 360;
      ctx.fillStyle = `hsl(${hue},50%,50%)`;

      let fontSize = 0;
      do {
        fontSize = Math.random() * 30; // Increase the font size range
      } while (fontSize < 22); // Ensure font size is at least 24
      ctx.font = 'bolder ' + fontSize + 'px Arial bold';

      ctx.translate(x, y);
      let rot = Math.random() * 80; // Reduce rotation for better alignment
      ctx.rotate((60 - rot) * (Math.PI / 180));
      ctx.translate(-x, -y);

      let char = 0;
      do {
        char = Math.random() * 122;
      } while (
        // Uppercase
        !(char >= 65 && char <= 170) &&
        // Lowercase
        !(char >= 97 && char <= 180) &&
        // Numeric
        !(char >= 48 && char <= 57)
      );
      let ch = String.fromCharCode(char);
      str += ch;
      ctx.fillText(ch, x, y);

      ctx.restore();
    }
    setCaptcha(str);
  };

  const redraw = () => {
    const canvas = ref.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 125, 50);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 225, 50);
        drawCaptchaBackground(ctx);
        drawCaptchaFace(ctx);
      }
    }
  };

  // const onSubmitClicked = (event: any) => {
  //   event.preventDefault(); // Prevent default form submission

  //   const isValid = enteredVal.toUpperCase() === captcha.toUpperCase();
  //   if (!isValid) {
  //     setError('Captcha verification failed. Please try again.');
  //   } else {
  //     setError('');
  //   }
  //   validate(isValid);
  // };

  const onResetClicked = (event: any) => {
    event.preventDefault(); // Prevent default form submission

    setCaptcha('');
    setEnteredVal('');
    redraw();
  };

  return (
    <div
      style={{
        backgroundColor: 'lightgray',
        borderRadius: '3px',
        padding: '3px',
        width: '133px',
        boxSizing: 'border-box',
        border: '1px solid gray',
      }}
    >
      <canvas
        width="125"
        height="40"
        style={{
          borderRadius: '3px',
        }}
        ref={ref}
      />
      <div>
        <input
          style={{
            width: '100px',
            boxSizing: 'border-box',
            borderRadius: '3px',
          }}
          className="border"
          onChange={(e) => {
            setEnteredVal(e.target.value);
          }}
          value={enteredVal}
          type="text"
        />
        <button
          style={{
            width: '25px',
          }}
          onClick={onResetClicked}
          className="text-[#000] font-semibold"
        >
          &#x21bb;
        </button>
      </div>
      {/* <button
        className="text-black font-semibold border px-2 rounded-sm"
        onClick={onSubmitClicked}
      >
        Verify
      </button> */}
    </div>
  );
};
