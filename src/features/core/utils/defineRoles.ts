import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";

type Actions = "view" | "add" | "edit";
type Subjects = "adminPage";

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(permissions: string[]) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (permissions) {
    permissions.forEach((p) => {
      let per = p.split("_");
      can(per[0] as Actions, per[1] as Subjects);
    });
  }

  return rules;
}

export function buildAbilityFor(permissions: string[]): AppAbility {
  return new AppAbility(defineRulesFor(permissions), {
    detectSubjectType: (object: any) => object!.type,
  });
}
