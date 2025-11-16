export const sessions = [
  {
    id: 'session-001',
    title: 'Product Analysis Discussion',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'session-002',
    title: 'Sales Data Review',
    timestamp: '2024-01-14T14:20:00Z'
  },
  {
    id: 'session-003',
    title: 'Customer Feedback Analysis',
    timestamp: '2024-01-13T09:15:00Z'
  }
];

export const conversationHistory = {
  'session-001': [
    {
      id: 'msg-001',
      role: 'user',
      content: 'Show me the top performing products',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'msg-002',
      role: 'assistant',
      content: 'Here are the top performing products based on sales data from the last quarter:',
      tableData: [
        { product: 'Laptop Pro X', sales: 1250, revenue: '$1,875,000', growth: '+25%' },
        { product: 'Wireless Mouse', sales: 3420, revenue: '$102,600', growth: '+15%' },
        { product: 'Mechanical Keyboard', sales: 2100, revenue: '$315,000', growth: '+30%' },
        { product: 'USB-C Hub', sales: 1890, revenue: '$94,500', growth: '+12%' },
        { product: 'Monitor 27"', sales: 980, revenue: '$392,000', growth: '+8%' }
      ],
      timestamp: '2024-01-15T10:30:05Z'
    }
  ],
  'session-002': [
    {
      id: 'msg-003',
      role: 'user',
      content: 'What are the regional sales figures?',
      timestamp: '2024-01-14T14:20:00Z'
    },
    {
      id: 'msg-004',
      role: 'assistant',
      content: 'Here is a breakdown of sales by region for Q4 2023:',
      tableData: [
        { region: 'North America', sales: '$5,200,000', orders: 8920, percentage: '42%' },
        { region: 'Europe', sales: '$3,800,000', orders: 6450, percentage: '31%' },
        { region: 'Asia Pacific', sales: '$2,100,000', orders: 4120, percentage: '17%' },
        { region: 'Latin America', sales: '$800,000', orders: 1580, percentage: '6%' },
        { region: 'Middle East', sales: '$500,000', orders: 930, percentage: '4%' }
      ],
      timestamp: '2024-01-14T14:20:05Z'
    }
  ],
  'session-003': [
    {
      id: 'msg-005',
      role: 'user',
      content: 'Show customer satisfaction ratings',
      timestamp: '2024-01-13T09:15:00Z'
    },
    {
      id: 'msg-006',
      role: 'assistant',
      content: 'Customer satisfaction metrics for the past month:',
      tableData: [
        { category: 'Product Quality', rating: '4.8/5', responses: 2340, trend: '↑ +0.2' },
        { category: 'Delivery Speed', rating: '4.6/5', responses: 2340, trend: '↑ +0.3' },
        { category: 'Customer Service', rating: '4.7/5', responses: 2340, trend: '→ 0.0' },
        { category: 'Value for Money', rating: '4.5/5', responses: 2340, trend: '↑ +0.1' },
        { category: 'Overall Experience', rating: '4.7/5', responses: 2340, trend: '↑ +0.2' }
      ],
      timestamp: '2024-01-13T09:15:05Z'
    }
  ]
};

export const mockResponses = [
  {
    description: 'Here are the quarterly performance metrics for your team:',
    tableData: [
      { metric: 'Revenue', Q1: '$250K', Q2: '$310K', Q3: '$380K', Q4: '$420K' },
      { metric: 'New Customers', Q1: '120', Q2: '145', Q3: '178', Q4: '195' },
      { metric: 'Retention Rate', Q1: '87%', Q2: '89%', Q3: '91%', Q4: '93%' },
      { metric: 'Avg Order Value', Q1: '$2,083', Q2: '$2,138', Q3: '$2,135', Q4: '$2,154' }
    ]
  },
  {
    description: 'Employee performance overview for the current period:',
    tableData: [
      { employee: 'Sarah Johnson', department: 'Sales', performance: '95%', status: 'Exceeds' },
      { employee: 'Mike Chen', department: 'Marketing', performance: '88%', status: 'Meets' },
      { employee: 'Lisa Brown', department: 'Support', performance: '92%', status: 'Exceeds' },
      { employee: 'David Lee', department: 'Engineering', performance: '90%', status: 'Exceeds' },
      { employee: 'Emma Wilson', department: 'Sales', performance: '85%', status: 'Meets' }
    ]
  },
  {
    description: 'Current inventory levels across all warehouses:',
    tableData: [
      { item: 'Laptop Pro X', warehouse: 'East', stock: 245, status: 'In Stock' },
      { item: 'Wireless Mouse', warehouse: 'West', stock: 1240, status: 'In Stock' },
      { item: 'Mechanical Keyboard', warehouse: 'Central', stock: 89, status: 'Low Stock' },
      { item: 'USB-C Hub', warehouse: 'East', stock: 15, status: 'Critical' },
      { item: 'Monitor 27"', warehouse: 'West', stock: 340, status: 'In Stock' }
    ]
  },
  {
    description: 'Website traffic analysis for the past 30 days:',
    tableData: [
      { source: 'Organic Search', visitors: '45,230', conversion: '3.2%', revenue: '$144,736' },
      { source: 'Direct', visitors: '28,450', conversion: '4.1%', revenue: '$116,645' },
      { source: 'Social Media', visitors: '18,920', conversion: '2.8%', revenue: '$52,976' },
      { source: 'Email Campaign', visitors: '12,340', conversion: '5.5%', revenue: '$67,870' },
      { source: 'Paid Ads', visitors: '9,870', conversion: '4.8%', revenue: '$47,376' }
    ]
  }
];

let sessionCounter = 4;

export function generateNewSessionId() {
  const id = `session-${String(sessionCounter).padStart(3, '0')}`;
  sessionCounter++;
  return id;
}

export function getRandomMockResponse() {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
