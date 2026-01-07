import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface SkillRadarProps {
  skills: {
    name: string;
    value: number;
    fullMark: number;
  }[];
}


const SkillRadar = ({ skills }: SkillRadarProps) => {
  return (
    <div className="card-elevated p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Skill Overview</h3>
        <p className="text-xs text-muted-foreground">Your competency across domains</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
            <PolarGrid
              stroke="hsl(var(--border))"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {skills.slice(0, 4).map((skill) => (
          <div key={skill.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
            <span className="text-xs text-muted-foreground truncate">{skill.name}</span>
            <span className="text-xs font-semibold text-foreground">{skill.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRadar;
