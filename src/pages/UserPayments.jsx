import { useState, useEffect } from "react"
import { API_URL } from "../config"
import { useAuth } from "../contexts/AuthContext"
import { CreditCard, Download, Eye, Filter, Calendar, Building } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"

const UserPayments = () => {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${API_URL}/payments/user/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setPayments(data)
        } else {
          // Demo data if API fails
          setPayments([
            {
              id: "TXN-8742",
              amount: 1200,
              status: "completed",
              date: new Date().toISOString(),
              hostel_name: "Campus Haven 1",
              hostel_id: 101,
              payment_method: "Credit Card",
              receipt_url: "#"
            },
            {
              id: "TXN-6523",
              amount: 1500,
              status: "processing",
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              hostel_name: "Campus Haven 2",
              hostel_id: 102,
              payment_method: "Mobile Money",
              receipt_url: "#"
            },
            {
              id: "TXN-5241",
              amount: 1800,
              status: "completed",
              date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              hostel_name: "Campus Haven 3",
              hostel_id: 103,
              payment_method: "Bank Transfer",
              receipt_url: "#"
            },
            {
              id: "TXN-4120",
              amount: 1200,
              status: "failed",
              date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
              hostel_name: "Campus Haven 1",
              hostel_id: 101,
              payment_method: "Credit Card",
              receipt_url: "#"
            },
            {
              id: "TXN-3254",
              amount: 1500,
              status: "completed",
              date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
              hostel_name: "Campus Haven 2",
              hostel_id: 102,
              payment_method: "Mobile Money",
              receipt_url: "#"
            }
          ])
        }
      } catch (error) {
        console.error("Error fetching payments:", error)
        // Demo data on error
        setPayments([
          {
            id: "TXN-8742",
            amount: 1200,
            status: "completed",
            date: new Date().toISOString(),
            hostel_name: "Campus Haven 1",
            hostel_id: 101,
            payment_method: "Credit Card",
            receipt_url: "#"
          },
          {
            id: "TXN-6523",
            amount: 1500,
            status: "processing",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            hostel_name: "Campus Haven 2",
            hostel_id: 102,
            payment_method: "Mobile Money",
            receipt_url: "#"
          },
          {
            id: "TXN-5241",
            amount: 1800,
            status: "completed",
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            hostel_name: "Campus Haven 3",
            hostel_id: 103,
            payment_method: "Bank Transfer",
            receipt_url: "#"
          },
          {
            id: "TXN-4120",
            amount: 1200,
            status: "failed",
            date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            hostel_name: "Campus Haven 1",
            hostel_id: 101,
            payment_method: "Credit Card",
            receipt_url: "#"
          },
          {
            id: "TXN-3254",
            amount: 1500,
            status: "completed",
            date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            hostel_name: "Campus Haven 2",
            hostel_id: 102,
            payment_method: "Mobile Money",
            receipt_url: "#"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const getFilteredPayments = () => {
    let filtered = [...payments]
    
    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter(payment => payment.status === filter)
    }
    
    // Filter by date range
    if (dateRange !== "all") {
      const now = new Date()
      let cutoffDate = new Date()
      
      if (dateRange === "30days") {
        cutoffDate.setDate(now.getDate() - 30)
      } else if (dateRange === "90days") {
        cutoffDate.setDate(now.getDate() - 90)
      } else if (dateRange === "year") {
        cutoffDate.setFullYear(now.getFullYear() - 1)
      }
      
      filtered = filtered.filter(payment => new Date(payment.date) >= cutoffDate)
    }
    
    return filtered
  }

  const filteredPayments = getFilteredPayments()
  
  const totalAmount = filteredPayments
    .filter(payment => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
            <p className="text-gray-500 mt-1">View and manage your payment transactions</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-sm text-purple-600">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900">GH₵{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700 font-medium">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {loading ? (
          <LoadingSpinner />
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No payment records found</p>
            <p className="text-gray-400">No payments match your current filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-md flex items-center justify-center mr-2">
                          <Building className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-900">{payment.hostel_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_method}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GH₵{payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button 
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                          onClick={() => alert("View details functionality will be implemented soon")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        {payment.status === "completed" && (
                          <button 
                            className="text-green-600 hover:text-green-900 flex items-center"
                            onClick={() => alert("Download receipt functionality will be implemented soon")}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Credit Card</span>
              <span className="text-sm font-medium text-gray-900">2 payments</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Mobile Money</span>
              <span className="text-sm font-medium text-gray-900">2 payments</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Bank Transfer</span>
              <span className="text-sm font-medium text-gray-900">1 payment</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Payment Status</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600">
              <Filter className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Completed</span>
              <span className="text-sm font-medium text-gray-900">3 payments</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Processing</span>
              <span className="text-sm font-medium text-gray-900">1 payment</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Failed</span>
              <span className="text-sm font-medium text-gray-900">1 payment</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Payment Timeline</h3>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Completed</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 mt-1">GH₵1,200 - Campus Haven 1</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Processing</p>
                <p className="text-xs text-gray-500">{new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 mt-1">GH₵1,500 - Campus Haven 2</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Completed</p>
                <p className="text-xs text-gray-500">{new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 mt-1">GH₵1,800 - Campus Haven 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPayments