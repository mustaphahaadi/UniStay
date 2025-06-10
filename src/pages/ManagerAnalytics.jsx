import { useAuth } from "../contexts/AuthContext"
import AdvancedAnalytics from "../components/AdvancedAnalytics"

const ManagerAnalytics = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdvancedAnalytics userRole="manager" />
    </div>
  )
}

export default ManagerAnalytics
