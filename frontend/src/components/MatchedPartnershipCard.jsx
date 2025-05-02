import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Handshake, Calendar, Code, BarChart } from 'lucide-react';

const MatchedPartnershipCard = ({ person1, person2 }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
    <CardHeader className="text-center  pb-6">
      <div className="flex justify-center items-center gap-6">
        {/* First Person */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <CardTitle className="text-lg font-semibold">{person1.name}</CardTitle>
          <div className="flex items-center justify-center gap-1 mt-1">
            {person1.role === 'Developer' ? 
              <Code className="w-4 h-4 text-blue-600" /> : 
              <BarChart className="w-4 h-4 text-blue-600" />
            }
            <p className="text-sm text-blue-600 font-medium">{person1.role}</p>
          </div>
        </div>

        {/* Match Icon */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Handshake className="w-6 h-6 text-green-600" />
          </div>
        </div>

        {/* Second Person */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <CardTitle className="text-lg font-semibold">{person2.name}</CardTitle>
          <div className="flex items-center justify-center gap-1 mt-1">
            {person2.role === 'Developer' ? 
              <Code className="w-4 h-4 text-blue-600" /> : 
              <BarChart className="w-4 h-4 text-blue-600" />
            }
            <p className="text-sm text-blue-600 font-medium">{person2.role}</p>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="text-center">
      <div className="flex items-center justify-center gap-2 text-green-600 mb-14">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">Matched 2 weeks ago</span>
      </div>
     
    </CardContent>
  </Card>
);
export default MatchedPartnershipCard;