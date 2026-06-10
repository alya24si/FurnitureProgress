import { Outlet } from "react-router-dom";

const authLayoutStyles = `
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  .auth-layout{
    display:flex;
    min-height:100vh;
    font-family:'Inter',sans-serif;
    background:#F8F5F2;
  }

  /* LEFT */
  .auth-brand{
    width:55%;
    background:linear-gradient(
      135deg,
      #B76E79,
      #C98B95,
      #D8B2B8
    );
    display:flex;
    justify-content:center;
    align-items:center;
    padding:50px;
  }

  .brand-content{
    max-width:550px;
    color:white;
  }

  .brand-badge{
    display:inline-block;
    padding:10px 20px;
    border-radius:30px;
    background:rgba(255,255,255,.18);
    margin-bottom:25px;
    font-weight:600;
  }

  .brand-title{
    font-size:56px;
    font-weight:700;
    line-height:1.1;
    margin-bottom:20px;
  }

  .brand-desc{
    font-size:18px;
    line-height:1.8;
    margin-bottom:35px;
  }

  .showcase-card{
    background:rgba(255,255,255,.15);
    backdrop-filter:blur(12px);
    border-radius:25px;
    padding:20px;
  }

  .showcase-image{
    width:100%;
    height:280px;
    object-fit:cover;
    border-radius:18px;
    margin-bottom:15px;
  }

  .showcase-card h3{
    font-size:24px;
    margin-bottom:10px;
  }

  .showcase-card p{
    font-size:15px;
    line-height:1.7;
  }

  /* RIGHT */
  .auth-form-area{
    width:45%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:40px;
    background:#F8F5F2;
  }

  .auth-form-wrapper{
    width:100%;
    max-width:450px;
    background:white;
    padding:40px;
    border-radius:30px;
    box-shadow:0 15px 40px rgba(183,110,121,.15);
  }

  @media(max-width:900px){

    .auth-layout{
      flex-direction:column;
    }

    .auth-brand{
      display:none;
    }

    .auth-form-area{
      width:100%;
      min-height:100vh;
      padding:20px;
    }

    .auth-form-wrapper{
      padding:25px;
    }
  }
`;

function AuthLayout() {
  return (
    <>
      <style>{authLayoutStyles}</style>

      <div className="auth-layout">

        {/* LEFT SIDE */}
        <div className="auth-brand">

          <div className="brand-content">

            <div className="brand-badge">
              ✨ FURNITUREKU
            </div>

            <h1 className="brand-title">
              Furnish Your Dream Home
            </h1>

            <p className="brand-desc">
              Temukan furniture premium dengan desain modern,
              kualitas terbaik, dan kenyamanan maksimal untuk
              melengkapi rumah impian Anda.
            </p>

            <div className="showcase-card">

              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                alt="Furniture"
                className="showcase-image"
              />

              <h3>Premium Furniture Collection</h3>

              <p>
                Sofa, meja, kursi, lemari dan berbagai furniture
                berkualitas tinggi dengan desain elegan untuk
                rumah modern.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-area">

          <div className="auth-form-wrapper">
            <Outlet />
          </div>

        </div>

      </div>
    </>
  );
}

export default AuthLayout;