import React from "react";
import "./Testimonials.css"; // Import the CSS for effects

const testimonials = [
  {
    img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
    name: "Maria Smantha",
    role: "Web Developer",
    roleClass: "text-primary",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    stars: [1, 1, 1, 1, 0.5],
  },
  {
    img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
    name: "Lisa Cudrow",
    role: "Graphic Designer",
    roleClass: "text-primary",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    stars: [1, 1, 1, 1, 1],
  },
  {
    img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp",
    name: "John Smith",
    role: "Marketing Specialist",
    roleClass: "text-primary",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    stars: [1, 1, 1, 1, 0],
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-xl-8 text-center">
          <h3 className="mb-4">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
        </div>
      </div>

      <div className="row text-center">
        {testimonials.map((t, idx) => (
          <div className="col-md-4 mb-5 mb-md-0" key={idx}>
            <div className="testimonial-card d-flex flex-column align-items-center p-4 mb-4">
              <img
                src={t.img}
                className="rounded-circle shadow-1-strong mb-3"
                width="150"
                height="150"
                alt={t.name}
              />
              <h5 className="mb-1">{t.name}</h5>
              <h6 className={`mb-3 ${t.roleClass}`}>{t.role}</h6>
              <p className="testimonial-text px-xl-3">
                <i className="fas fa-quote-left pe-2"></i>
                {t.text}
              </p>
              <ul className="list-unstyled d-flex justify-content-center mb-0">
                {t.stars.map((val, i) => (
                  <li key={i}>
                    {val === 1 ? (
                      <i className="fas fa-star fa-sm text-warning"></i>
                    ) : val === 0.5 ? (
                      <i className="fas fa-star-half-alt fa-sm text-warning"></i>
                    ) : (
                      <i className="far fa-star fa-sm text-warning"></i>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
