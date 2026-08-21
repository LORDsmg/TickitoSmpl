import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Container from "../../components/common/Container";


const Register = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  role: 'ROLE_USER',
});
   
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.toString() || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
<section className="py-16">
<Container>

<form
onSubmit={handleSubmit}
className="mx-auto max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8"
>

<p className="font-semibold tracking-widest text-yellow-400">
CREATE ACCOUNT
</p>

<h1 className="mt-2 text-4xl font-bold">
Join TIKITO
</h1>

<label className="mt-8 block text-sm font-medium">
  First Name
  <input
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3"
  />
</label>

<label className="mt-5 block text-sm font-medium">
  Last Name
  <input
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
    className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3"
  />
</label>

<label className="mt-5 block text-sm font-medium">
Email
<input
type="email"
name="email"
value={formData.email}
onChange={handleChange}
className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3"
/>
</label>


<label className="mt-5 block text-sm font-medium">
Password
<input
type="password"
name="password"
value={formData.password}
onChange={handleChange}
className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3"
/>
</label>

<label className="mt-5 block text-sm font-medium">
  Phone
  <input
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3"
  />
</label>


<button
className="mt-8 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black"
>
{loading ? "Creating..." : "Create Account"}
</button>


<p className="mt-5 text-center text-sm text-gray-400">
Already member?
<Link to="/login" className="text-yellow-400 ml-1">
Sign in
</Link>
</p>


</form>

</Container>
</section>
);
};
export default Register;







// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../redux/slices/authSlice";
// import Container from "../../components/common/Container";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const submit = (event) => { event.preventDefault(); dispatch(loginSuccess({ user: { name, email, role: "USER" }, token: "demo-token" })); navigate("/"); };
//   return <section className="py-16"><Container><form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8"><p className="font-semibold tracking-widest text-yellow-400">CREATE ACCOUNT</p><h1 className="mt-2 text-4xl font-bold">Join TIKITO</h1><label className="mt-8 block text-sm font-medium">Name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400" /></label><label className="mt-5 block text-sm font-medium">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400" /></label><label className="mt-5 block text-sm font-medium">Password<input type="password" required className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400" /></label><button className="mt-8 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black">Create Account</button><p className="mt-5 text-center text-sm text-gray-400">Already a member? <Link to="/login" className="text-yellow-400">Sign in</Link></p></form></Container></section>;
// }

// export default Register;
