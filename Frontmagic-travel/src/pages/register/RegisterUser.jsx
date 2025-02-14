import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.scss"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"






const Register = () => {
const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    img: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
    email: Yup.string().email("Email inválido").required("Requerido"),
    country: Yup.string().required("Requerido"),
    city: Yup.string().required("Requerido"),
    phone: Yup.string()
      .matches(/^\d+$/, "Solo números")
      .min(10, "Mínimo 10 dígitos")
      .required("Requerido"),
    img: Yup.string().url("URL inválida"),
    password: Yup.string().min(8, "Mínimo 8 caracteres").required("Requerido"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);

      toast.success("Usuario registrado exitosamente!");
     

      setTimeout(() => {
        navigate("/login");
      }, 2000);


      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
    <div className="img"></div>
      <h2>Crear Cuenta</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div class = "register">
              <Field type="text" name="username" placeholder="Usario" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <Field type="text" name="country" placeholder="Pais" />
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <div>
              <Field type="text" name="city" placeholder="Ciudad" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div>
              <Field type="tel" name="phone" placeholder="Telefono" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div>
              <Field type="text" name="img" placeholder="Imgen de Perfil" />
              <ErrorMessage name="img" component="div" className="error" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Contraseña" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
