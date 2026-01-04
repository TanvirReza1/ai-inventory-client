const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
          required
        />

        <textarea
          placeholder="Your Message"
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
