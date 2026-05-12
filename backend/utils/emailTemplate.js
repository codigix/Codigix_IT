const getEmailTemplate = (contentTitle, details) => {
  const detailRows = details.map(item => `
    <tr style="border-bottom: 1px solid #eeeeee;">
      <td style="padding: 15px; width: 40px; vertical-align: middle; text-align: center;">
        <div style="background-color: #060129; width: 32px; height: 32px; border-radius: 50%; display: inline-block; line-height: 32px; color: #ffffff; font-size: 16px;">
          ${item.icon || '•'}
        </div>
      </td>
      <td style="padding: 15px; font-weight: bold; color: #060129; width: 100px; vertical-align: middle;">${item.label}</td>
      <td style="padding: 15px; font-weight: bold; color: #060129; width: 20px; vertical-align: middle; text-align: center;">:</td>
      <td style="padding: 15px; color: #524f66; vertical-align: middle;">${item.value}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 700px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <!-- Top Logo -->
        <div style="padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/foodfantacy/image/upload/v1778325227/img28_1_aw34oe.webp" alt="Codigix" style="height: 60px;">
        </div>

        <!-- Header Banner -->
        <div style="background-color: #060129; padding: 15px 30px; text-align: center; position: relative;">
          <table width="100%">
            <tr>
              <td align="left" width="30"><img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="24" style="filter: invert(1);"></td>
              <td align="center" style="color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: 1px;">${contentTitle}</td>
              <td align="right" width="30"><img src="https://cdn-icons-png.flaticon.com/512/2965/2965306.png" width="24" style="filter: invert(1);"></td>
            </tr>
          </table>
        </div>

        <!-- Body -->
        <div style="padding: 40px 40px 20px 40px;">
          <h3 style="margin-top: 0; color: #060129; font-size: 18px;">Hello Team,</h3>
          <p style="color: #524f66; margin-bottom: 25px;">You have received a new enquiry through the Contact Form on your website. Please find the details below:</p>

          <!-- Details Box -->
          <div style="border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; margin-bottom: 30px;">
            <table width="100%" style="border-collapse: collapse;">
              ${detailRows}
            </table>
          </div>

          <!-- Info Box -->
          <div style="background-color: #eef5ff; border-radius: 8px; padding: 20px; margin-bottom: 30px; display: table; width: 100%; box-sizing: border-box;">
            <div style="display: table-cell; width: 40px; vertical-align: middle; text-align: center;">
               <div style="background-color: #0056b3; width: 30px; height: 30px; border-radius: 50%; color: #fff; line-height: 30px; font-weight: bold; font-style: italic;">i</div>
            </div>
            <div style="display: table-cell; padding-left: 15px; vertical-align: middle; color: #004085; font-size: 14px;">
              Please respond to this enquiry at your earliest convenience. Timely follow-up helps build strong customer relationships.
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="margin: 0; font-weight: bold; color: #060129;">Best Regards,</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; color: #6c56b6; font-size: 16px;">Codigix Team</p>
            <p style="margin: 2px 0 0 0; color: #524f66; font-size: 14px;">Codigix Infotech Pvt. Ltd.</p>
          </div>

          <!-- Divider -->
          <div style="border-top: 1px solid #e0e0e0; margin-bottom: 30px;"></div>

          <!-- Footer Contact Info -->
          <table width="100%" style="margin-bottom: 30px;">
            <tr>
              <td width="40%" style="vertical-align: top;">
                <div style="display: table; margin-bottom: 10px;">
                  <div style="display: table-cell; width: 25px; color: #6c56b6; font-size: 18px;">📍</div>
                  <div style="display: table-cell; font-weight: bold; color: #060129; padding-left: 5px;">Address</div>
                </div>
                <div style="font-size: 13px; color: #524f66; padding-left: 30px; line-height: 1.4;">
                  Office No: 514, 5th Floor,<br>
                  Brahma Sky Uzuri, MIDC,<br>
                  Pimpri-Chinchwad,<br>
                  Maharashtra 411018.
                </div>
              </td>
              <td width="30%" style="vertical-align: top;">
                <div style="display: table; margin-bottom: 10px;">
                  <div style="display: table-cell; width: 25px; color: #6c56b6; font-size: 18px;">📞</div>
                  <div style="display: table-cell; font-weight: bold; color: #060129; padding-left: 5px;">Phone</div>
                </div>
                <div style="font-size: 13px; color: #524f66; padding-left: 30px; margin-bottom: 15px;">
                  9112706604
                </div>
                <div style="display: table; margin-bottom: 10px;">
                  <div style="display: table-cell; width: 25px; color: #6c56b6; font-size: 18px;">✉️</div>
                  <div style="display: table-cell; font-weight: bold; color: #060129; padding-left: 5px;">Email</div>
                </div>
                <div style="font-size: 13px; color: #524f66; padding-left: 30px;">
                  codigixinfotechpvtltd@gmail.com
                </div>
              </td>
              <td width="30%" style="vertical-align: bottom; text-align: right;">
                <img src="https://codigixinfotech.com/assets/images/logos/logo.png" alt="Codigix" style="height: 35px; margin-bottom: 15px;">
                <div style="text-align: right;">
                  <a href="https://www.facebook.com/codigix.infotech" style="text-decoration: none; margin-left: 5px;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="24"></a>
                  <a href="https://www.linkedin.com/company/codigix-infotech" style="text-decoration: none; margin-left: 5px;"><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" width="24"></a>
                  <a href="https://www.instagram.com/codigix?igsh=ZnphZnA5NWJjZnp1" style="text-decoration: none; margin-left: 5px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="24"></a>
                  <a href="https://x.com/CodigixI2994" style="text-decoration: none; margin-left: 5px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" width="24"></a>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Bottom Black Bar -->
        <div style="background-color: #060129; padding: 15px; text-align: center; color: #ffffff; font-size: 12px;">
          <span style="margin-right: 10px;">🔒</span> This is an automated email. Please do not reply to this email.
        </div>
      </div>
    </body>
    </html>
  `;
};

const getThankYouTemplate = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="max-width: 700px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <!-- Top Logo & Slogan -->
        <div style="padding: 20px; text-align: center;">
          <img src="https://res.cloudinary.com/foodfantacy/image/upload/v1778325227/img28_1_aw34oe.webp" alt="Codigix" style="height: 60px;">
          <p style="margin: 10px 0 0 0; color: #060129; font-size: 14px; font-weight: bold; letter-spacing: 1px;">AI-Powered Solutions for a Smarter Tomorrow</p>
        </div>

        <!-- Hero Section -->
        <div style="padding: 40px; background-color: #ffffff; position: relative; overflow: hidden;">
          <table width="100%">
            <tr>
              <td width="60%" style="vertical-align: middle;">
                <h1 style="color: #230f62; font-family: 'Georgia', serif; font-size: 56px; margin: 0; font-style: italic;">Thank You!</h1>
                <h2 style="color: #060129; font-size: 24px; margin: 10px 0 30px 0;">We Appreciate You</h2>
                
                <div style="width: 50px; height: 3px; background: linear-gradient(to right, #ff0000, #0000ff); margin-bottom: 30px;"></div>
                
                <p style="color: #524f66; font-size: 16px; margin-bottom: 15px;">Thank you for reaching out to Codigix.</p>
                <p style="color: #524f66; font-size: 16px; margin-bottom: 25px;">We have received your message and our team will review it carefully.</p>
                <p style="color: #524f66; font-size: 16px; margin-bottom: 25px;">We will get back to you within 24 business hours with the best possible solution.</p>
                <p style="color: #060129; font-size: 18px; font-weight: bold;">We look forward to working with you!</p>
              </td>
              <td width="40%" style="vertical-align: middle; text-align: right;">
                <div style="background-color: #060129; width: 220px; height: 220px; border-radius: 50%; display: inline-block; position: relative;">
                   <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 160px; height: 160px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%;"></div>
                   <img src="https://cdn-icons-png.flaticon.com/512/6124/6124995.png" alt="Thank You" style="width: 140px; margin-top: 40px; filter: invert(1);">
                   <div style="position: absolute; top: 20px; right: -20px; transform: rotate(15deg);"><img src="https://cdn-icons-png.flaticon.com/512/739/739249.png" width="40" style="filter: opacity(0.3);"></div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding: 0 40px;">
           <div style="border-top: 1px solid #e0e0e0; text-align: center; margin: 20px 0; position: relative;">
              <span style="background-color: #ffffff; padding: 0 20px; color: #060129; font-size: 24px; font-weight: bold; position: relative; top: -18px;">Get in Touch</span>
           </div>
           <div style="text-align: center; margin-bottom: 40px;">
              <div style="width: 30px; height: 2px; background-color: #ff0000; margin: 0 auto 15px auto;"></div>
              <p style="color: #524f66; font-size: 16px;">If you have any urgent queries, feel free to contact us using the details below.</p>
           </div>
        </div>

        <!-- Contact Details -->
        <div style="padding: 0 40px 40px 40px;">
          <table width="100%">
            <tr>
              <td width="33%" style="text-align: center; border-right: 1px solid #eeeeee;">
                <div style="background-color: #060129; width: 45px; height: 45px; border-radius: 50%; display: inline-block; line-height: 45px; margin-bottom: 15px;">
                  <span style="color: #ffffff; font-size: 20px;">📍</span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: #060129;">Address</h4>
                <p style="margin: 0; font-size: 13px; color: #524f66; line-height: 1.4;">
                  Office No: 514, 5th Floor,<br>
                  Brahma Sky Uzuri, MIDC,<br>
                  Pimpri-Chinchwad,<br>
                  Maharashtra 411018.
                </p>
              </td>
              <td width="33%" style="text-align: center; border-right: 1px solid #eeeeee;">
                <div style="background-color: #060129; width: 45px; height: 45px; border-radius: 50%; display: inline-block; line-height: 45px; margin-bottom: 15px;">
                  <span style="color: #ffffff; font-size: 20px;">📞</span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: #060129;">Phone</h4>
                <p style="margin: 0; font-size: 13px; color: #524f66;">9112706604</p>
              </td>
              <td width="33%" style="text-align: center;">
                <div style="background-color: #060129; width: 45px; height: 45px; border-radius: 50%; display: inline-block; line-height: 45px; margin-bottom: 15px;">
                  <span style="color: #ffffff; font-size: 20px;">✉️</span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: #060129;">Email</h4>
                <p style="margin: 0; font-size: 13px; color: #524f66;">codigixinfotechpvtltd@gmail.com</p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background-color: #060129; padding: 40px 20px; text-align: center;">
          <div style="margin-bottom: 25px;">
            <a href="https://www.facebook.com/codigix.infotech" style="text-decoration: none; margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="32" style="filter: brightness(0) invert(1);"></a>
            <a href="https://www.linkedin.com/company/codigix-infotech" style="text-decoration: none; margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" width="32" style="filter: brightness(0) invert(1);"></a>
            <a href="https://www.instagram.com/codigix?igsh=ZnphZnA5NWJjZnp1" style="text-decoration: none; margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" width="32" style="filter: brightness(0) invert(1);"></a>
            <a href="https://x.com/CodigixI2994" style="text-decoration: none; margin: 0 8px;"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" width="32" style="filter: brightness(0) invert(1);"></a>
          </div>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px;">
             <h4 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 1px;">Codigix Infotech Pvt. Ltd.</h4>
             <p style="color: #6c56b6; margin: 5px 0 0 0; font-size: 12px;">AI-Powered Solutions for a Smarter Tomorrow</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getEmailTemplate, getThankYouTemplate };
