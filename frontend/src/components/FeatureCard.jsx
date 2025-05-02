const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg  transition-shadow mb-8 shadow-lg">
    <div className="flex justify-center gap-2">
      <div className="text-3xl text-yellow-500 font-semibold">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    </div>
    <p className="text-gray-600 flex justify-center items-center">{description}</p>
  </div>
);
export default FeatureCard