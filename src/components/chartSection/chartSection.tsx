
import Image from "next/image";
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to prevent SSR issues
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

// Interface defining the props structure for the StatsCard component
interface StatsCardProps {
  title: string;          // Card title (e.g., "Total active users")
  value: number;          // Main numeric value to display
  change: number;         // Percentage change (positive or negative)
  period: string;         // Time period context (e.g., "last 7 days")
  color: string;          // Custom color for chart and UI elements
  chartData?: {           // Optional chart data
    series: number[];     // Data points for the chart
    categories: string[]; // Labels for the data points
  };
}

// Define types for the tooltip function parameters
interface TooltipParams {
  series: number[][];     // Array of data series
  seriesIndex: number;    // Index of the current series
  dataPointIndex: number; // Index of the current data point
  w: any;                 // Chart context (using any as ApexCharts types are complex)
}

// StatsCard component - displays a statistic with chart and change indicator
const StatsCard = ({ title, value, change, period, color, chartData }: StatsCardProps) => {
  // Determine if the change is positive or negative
  const isPositive = change >= 0;
  
  // Select appropriate arrow icon based on change direction
  const ChangeIcon = isPositive ? (
    <Image 
      src="/images/chartSection/upArrow.png" 
      height={15} 
      width={15} 
      alt="upArrow" 
      unoptimized 
    />
  ) : (
    <Image 
      src="/images/chartSection/downArrow.png" 
      height={15} 
      width={15} 
      alt="downArrow" 
      unoptimized 
    />
  );

  // Configuration options for the ApexCharts bar chart
  const chartOptions = {
    // Chart data series
    series: [{
      name: 'Value',  // Series name for tooltips
      data: chartData?.series || []  // Use provided data or empty array as fallback
    }],
    
    // Base chart configuration
    chart: {
      type: 'bar',        // Chart type
      height: 100,        // Chart height
      toolbar: { show: false },  // Hide chart toolbar
      animations: { enabled: true }  // Enable animations
    },
    
    // Bar styling options
    plotOptions: {
      bar: {
        borderRadius: 4,      // Rounded corners for bars
        horizontal: false,    // Vertical bars
        columnWidth: '80%',   // Width of bars relative to available space
      }
    },
    
    dataLabels: { enabled: false },  // Disable data labels on bars
    
    colors: [color],  // Use the provided color for bars
    
    // X-axis configuration
    xaxis: {
      categories: chartData?.categories || [],  // Category labels
      axisBorder: { show: false },  // Hide axis border
      axisTicks: { show: false },   // Hide axis ticks
      labels: { 
        show: false,  // Hide labels
        style: {
          colors: 'transparent'  // Make labels transparent as fallback
        }
      }
    },
    
    yaxis: { show: false },  // Hide Y-axis
    grid: { show: false },   // Hide chart grid
    
    // Custom tooltip configuration
    tooltip: {
      enabled: true,  // Enable tooltips
      custom: function({ series, seriesIndex, dataPointIndex, w }: TooltipParams) {
        // Get the month name using multiple fallback methods
        let month;
        
        // Method 1: Try to get from chartData categories directly
        if (chartData?.categories && chartData.categories[dataPointIndex]) {
          month = chartData.categories[dataPointIndex];
        }
        // Method 2: Try from chart globals labels
        else if (w.globals?.labels && w.globals.labels[dataPointIndex]) {
          month = w.globals.labels[dataPointIndex];
        }
        // Method 3: Try from chart globals categoryLabels
        else if (w.globals?.categoryLabels && w.globals.categoryLabels[dataPointIndex]) {
          month = w.globals.categoryLabels[dataPointIndex];
        }
        // Method 4: Fallback to month names by index
        else {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          month = months[dataPointIndex] || `Month ${dataPointIndex + 1}`;
        }
        
        // Get the value for this data point
        const value = series[seriesIndex][dataPointIndex];
        
        // Return custom HTML for the tooltip
        return `
          <div style="
            background: white;
            border-radius: 30%;                   
            font-family: inherit;
          ">
            <!-- Gray header with month name -->
            <div style="
              background: #F3F4F6;
              padding: 5px 10px;
              font-weight: 900;
              font-size: 15px;
              color: #6B7280;
              text-align: center;
            ">
              ${month}
            </div>
            
            <!-- Bottom section with colored circle and value -->
            <div style="
              padding: 12px 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            ">
              <!-- Colored circle using the provided color -->
              <span style="
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: ${color};
                display: inline-block;
              "></span>
              
              <!-- Display the value -->
              <span style="
                font-weight: 700;
                font-size: 14px;
                color: black;
                margin-left:1px
              ">
                ${value}
              </span>
            </div>
          </div>
        `;
      }
    }
  };
 
  // Render the stats card component
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
      {/* Left section: Title, value, and change indicator */}
      <div>
        <p className="text-md font-bold text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-3">{value.toLocaleString("en-US")}</p>
        <div className={`flex items-center mt-3 text-sm space-x-2 ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {ChangeIcon}
          <span>{change}% <span className="text-gray-500">{period}</span></span>
        </div>
      </div>
      
      {/* Right section: Chart visualization */}
      <div className="mt-4 bg-red-30 w-28">
        {/* Render chart only on client-side to avoid SSR issues */}
        {typeof window !== 'undefined' && (
          <ApexCharts
            options={chartOptions as any}
            series={chartOptions.series}
            type="bar"
            height={130}
            width="100%"
          />
        )}
      </div>
    </div>
  );
};

// ChartSection component - container for all stats cards
export const ChartSection = () => {
  // Data for all statistic cards
  const statsData: StatsCardProps[] = [
    {
      title: "Total active users",
      value: 18765,
      change: 2.6,
      period: "last 7 days",
      color: "#00A76F", // Green color
      chartData: {
        series: [15, 18, 12, 51, 68, 11, 39, 37],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
      }
    },
    {
      title: "Total installed",
      value: 4876,
      change: 0.2,
      period: "last 7 days",
      color: "#00B8D9", // Blue color
      chartData: {
        series: [20, 41, 63, 33, 28, 35, 50, 46],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
      }
    },
    {
      title: "Total downloads",
      value: 678,
      change: -0.1,
      period: "last 7 days",
      color: "#FF5630", // Red color
      chartData: {
        series: [18, 19, 31, 18, 8, 16, 37, 12],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
      }
    },
    {
      title: "Premium subscribers",
      value: 2450,
      change: 5.3,
      period: "last 7 days",
      color: "#FFAB00", // Yellow/Orange color
      chartData: {
        series: [10, 15, 22, 18, 25, 30, 28, 35],
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
      }
    },
  ];

  // Render the grid of stats cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 my-5 w-[95%] md:w-[98%] mx-auto">
      {/* Map through statsData to render each card */}
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};
