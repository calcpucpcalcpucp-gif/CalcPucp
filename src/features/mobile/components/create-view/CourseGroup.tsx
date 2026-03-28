import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { GradeGroup } from "../../types/type";
import { createComponent } from "../../store/utils";

export const CourseGroup = ({
  group,
  setGroups,
}: {
  group: GradeGroup;
  setGroups: (
    data: GradeGroup[] | ((data: GradeGroup[]) => GradeGroup[]),
  ) => void;
}) => {
  const updateGroup = (gId: number, patch: Partial<GradeGroup>) =>
    setGroups((gs) => gs.map((g) => (g.id === gId ? { ...g, ...patch } : g)));

  const addComponentToGroup = (gId: number) =>
    setGroups((gs) =>
      gs.map((g) => {
        if (g.id !== gId) return g;
        return {
          ...g,
          components: [
            ...g.components,
            createComponent(`${g.name} ${g.components.length + 1}`),
          ],
        };
      }),
    );

  const removeGroup = (gId: number) =>
    setGroups((gs) => gs.filter((g) => g.id !== gId));

  const removeComponent = (gId: number, cId: number) =>
    setGroups((gs) =>
      gs.map((g) => {
        if (g.id !== gId) return g;
        return { ...g, components: g.components.filter((c) => c.id !== cId) };
      }),
    );

  return (
    <div className="glass rounded-2xl p-4 animate-scale-in">
      <div className="flex items-center gap-2 mb-3">
        <Input
          value={group.name}
          onChange={(e) => updateGroup(group.id, { name: e.target.value })}
          className="flex-1 h-8 text-sm font-medium"
        />
        <div className="flex items-center gap-1">
          <Input
            type="number"
            inputMode="decimal"
            value={(group.weight * 100).toString()}
            onChange={(e) =>
              updateGroup(group.id, {
                weight: parseFloat(e.target.value || "0") / 100,
              })
            }
            className="w-16 h-8 text-sm text-center"
            min={0}
            max={100}
          />
          <span className="text-xs text-muted-foreground">%</span>
        </div>
        <button
          title="delete"
          onClick={() => removeGroup(group.id)}
          className="p-1 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <label className="text-xs text-muted-foreground">Agregación:</label>
        <select
          title="select-avarage-method"
          value={group.aggregation}
          onChange={(e) =>
            updateGroup(group.id, {
              aggregation: e.target.value as GradeGroup["aggregation"],
            })
          }
          className="text-xs bg-secondary rounded-lg px-2 py-1 text-secondary-foreground"
        >
          <option value="average">Promedio</option>
          <option value="lowest-drop">Eliminar menor</option>
        </select>
      </div>

      <div className="space-y-2">
        {group.components.map((comp) => (
          <div key={comp.id} className="flex items-center gap-2">
            <Input
              value={comp.name}
              onChange={(e) => {
                setGroups((gs) =>
                  gs.map((g) =>
                    g.id === group.id
                      ? {
                          ...g,
                          components: g.components.map((c) =>
                            c.id === comp.id
                              ? { ...c, name: e.target.value }
                              : c,
                          ),
                        }
                      : g,
                  ),
                );
              }}
              className="flex-1 h-7 text-xs"
            />
            <button
              title="delete"
              onClick={() => removeComponent(group.id, comp.id)}
              className="p-1 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => addComponentToGroup(group.id)}
          className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
        >
          <Plus className="w-3 h-3" /> Agregar componente
        </button>
      </div>
    </div>
  );
};
