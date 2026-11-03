/* CSE1101 revision content adapted from the 11-week outline supplied by the student. */
const LESSONS = [
{
 week:1,title:"Propositional logic",short:"Propositions, operators and basic truth tables",focus:true,
 intro:"Start here. Learn to translate ordinary statements into symbols and evaluate compound statements precisely.",
 goals:["Decide whether a sentence is a proposition.","Understand ¬, ∧, ∨, → and ↔.","Evaluate the main logical operators using truth tables."],
 sections:[
 {title:"1. Statements and propositions",body:"A proposition is a declarative sentence with exactly one truth value: true or false. “7 is odd” is a proposition. “Close the door” is a command, so it is not. We use lowercase letters p, q and r to stand for propositions."},
 {title:"2. The five key connectives",body:"Negation ¬p reverses a truth value. Conjunction p ∧ q is true only if both are true. Inclusive disjunction p ∨ q is true if at least one is true. Conditional p → q is false only when p is true and q is false. Biconditional p ↔ q is true exactly when p and q agree.",formula:"¬p   |   p ∧ q   |   p ∨ q   |   p → q   |   p ↔ q",note:"Remember: 'or' in mathematical logic is inclusive unless explicitly stated otherwise."},
 {title:"3. A complete two-variable truth table",body:"Two distinct propositions create 2² = 4 rows. Use all four combinations systematically: TT, TF, FT and FF.",formula:"p q  |  p∧q  p∨q  p→q  p↔q\nT T  |    T     T     T     T\nT F  |    F     T     F     F\nF T  |    F     T     T     F\nF F  |    F     F     T     T",note:"A conditional says what must happen when its premise is true; it makes no claim when its premise is false."}
 ],examples:[
 {title:"Translate a sentence",question:"'If it rains, then the match is cancelled.' Let r = it rains and c = the match is cancelled.",steps:["Identify the condition: 'it rains' is r.","Identify the result: 'the match is cancelled' is c.","Write the conditional: r → c."]},
 {title:"Evaluate p → q",question:"What is the truth value when p is false and q is true?",steps:["A conditional is false only for p = T and q = F.","Here p = F, so the conditional is true.","Answer: F → T = T."]}
 ],trap:"Do not confuse p → q with q → p. The converse is a different statement."
},
{
 week:2,title:"Truth tables & equivalence",short:"Constructing truth tables and algebra of logic",focus:true,
 intro:"Move from single connectives to multi-step expressions, tautologies, contradictions and logical equivalences.",
 goals:["Build tables for nested logical formulas.","Identify tautologies and contradictions.","Apply De Morgan's laws and implication equivalences."],
 sections:[
 {title:"1. Build truth tables step by step",body:"For n different propositional variables, a full table needs 2ⁿ rows. Add a column for each subexpression, working from the innermost parentheses outward. Operators are normally applied in this order: ¬, ∧, ∨, →, ↔.",formula:"2 variables → 4 rows     3 variables → 8 rows",note:"Make a separate column for ¬q before evaluating p ∨ ¬q."},
 {title:"2. Tautology, contradiction and contingency",body:"A tautology is true in every row, such as p ∨ ¬p. A contradiction is false in every row, such as p ∧ ¬p. A contingency has at least one true and one false row. Two expressions are logically equivalent when their final truth-table columns match on every row.",formula:"p ≡ q  means the expressions have identical truth values in every case."},
 {title:"3. Equivalence laws you must know",body:"De Morgan's laws turn the negation of 'and' into 'or' with each part negated, and vice versa. A conditional can be rewritten as a disjunction. Negating a conditional requires p ∧ ¬q, not ¬p → ¬q.",formula:"¬(p ∧ q) ≡ ¬p ∨ ¬q\n¬(p ∨ q) ≡ ¬p ∧ ¬q\np → q ≡ ¬p ∨ q\np ↔ q ≡ (p → q) ∧ (q → p)"}
 ],examples:[
 {title:"Verify De Morgan's law",question:"Prove ¬(p ∧ q) and ¬p ∨ ¬q are equivalent.",steps:["Use rows TT, TF, FT, FF.","¬(p ∧ q) produces F, T, T, T.","¬p ∨ ¬q also produces F, T, T, T.","The columns match, so they are logically equivalent."]},
 {title:"Negate an implication",question:"Negate 'If I study, I pass.'",steps:["Write p → q, where p = I study and q = I pass.","Negate: ¬(p → q) ≡ p ∧ ¬q.","Read it: 'I study AND I do not pass.'"]}
 ],trap:"For three variables there are 8 rows, not 6. Do not forget to enumerate every assignment."
},
{
 week:3,title:"Predicate logic & quantifiers",short:"Predicates, ∀, ∃ and quantified equivalence",focus:true,
 intro:"Extend propositional logic to statements about members of a domain, such as 'every student' or 'at least one student'.",
 goals:["Identify predicates and domains.","Translate universal and existential quantified statements.","Negate quantified expressions accurately."],
 sections:[
 {title:"1. Predicates require a domain",body:"A predicate P(x) becomes true or false when x receives a value from a specified domain. For example, P(x): 'x is even' with domain the integers. P(4) is true while P(3) is false. Never omit the domain when interpreting a mathematical claim."},
 {title:"2. Universal and existential quantification",body:"The universal quantifier ∀x means 'for every x'. The existential quantifier ∃x means 'there exists at least one x'. The assertion ∃x P(x) requires just one witness. The assertion ∀x P(x) can be disproved with one counterexample.",formula:"∀x P(x) : P(x) holds for every x\n∃x P(x) : P(x) holds for at least one x"},
 {title:"3. Negations and order of quantifiers",body:"To negate a quantified statement, swap ∀ and ∃ and negate the predicate. Order matters with two quantifiers: 'everyone likes someone' does not necessarily mean 'there is someone everyone likes'. In expressions over a student domain, 'all students who study pass' is ∀x (S(x) → P(x)).",formula:"¬∀x P(x) ≡ ∃x ¬P(x)\n¬∃x P(x) ≡ ∀x ¬P(x)\n∀x∃y R(x,y) is NOT generally equivalent to ∃y∀x R(x,y)"}
 ],examples:[
 {title:"Negate 'All birds fly'",question:"Domain: all birds. Let F(x) mean 'x can fly'.",steps:["Original: ∀x F(x).","Change ∀ to ∃ and negate F.","Negation: ∃x ¬F(x) = 'At least one bird cannot fly.'"]},
 {title:"Translate 'Some students like maths'",question:"Domain: all people. S(x) = x is a student; M(x) = x likes maths.",steps:["'Some' means at least one: ∃x.","The person must be a student AND like maths.","Answer: ∃x (S(x) ∧ M(x))."]}
 ],trap:"'All A are B' becomes ∀x(A(x) → B(x)), not ∀x(A(x) ∧ B(x)) when the domain includes non-A objects."
},
{
 week:4,title:"Logical arguments",short:"Premises, conclusions and symbolic translation",focus:true,
 intro:"Learn how premises support a conclusion, how to symbolize arguments, and why a valid argument depends on form.",
 goals:["Identify premises and conclusions.","Express ordinary-language arguments symbolically.","Recognize arguments containing quantified statements."],
 sections:[
 {title:"1. What is an argument?",body:"An argument consists of one or more premises followed by a conclusion. The premises are the assumptions being used, not necessarily true in real life. The question of validity is whether the conclusion would have to be true whenever all premises are true."},
 {title:"2. Standard symbolic form",body:"Translate each sentence consistently. The symbol ∴ means 'therefore'. For example: 'If the server is online, the website works. The server is online. Therefore, the website works.' becomes p → q, p, ∴ q.",formula:"Premise 1: p → q\nPremise 2: p\n────────────\nConclusion: q"},
 {title:"3. Arguments with quantifiers",body:"Quantified arguments combine general claims with facts about an individual. Universal instantiation lets us apply ∀x(P(x) → Q(x)) to a named member a, obtaining P(a) → Q(a). If P(a) is also known, Modus Ponens then yields Q(a).",formula:"∀x(P(x) → Q(x)), P(a) ⊢ Q(a)",note:"⊢ means 'can be derived'. The conclusion is reached using universal instantiation plus Modus Ponens."}
 ],examples:[
 {title:"Symbolize an everyday argument",question:"'If I submit, I get a receipt. I submitted. Therefore, I get a receipt.'",steps:["Let s = I submit and r = I get a receipt.","Premises: s → r; s.","Conclusion: ∴ r. This has the valid Modus Ponens form."]},
 {title:"Use a quantified premise",question:"Every programmer understands algorithms. Ali is a programmer. What follows?",steps:["Let P(x) = x is a programmer; A(x) = x understands algorithms.","Premises: ∀x(P(x) → A(x)); P(Ali).","Instantiate to P(Ali) → A(Ali).","Conclude A(Ali) by Modus Ponens."]}
 ],trap:"Validity is not the same as having factually true premises. An argument can be valid even with false premises."
},
{
 week:5,title:"Rules of inference",short:"Valid forms, Modus Ponens, Modus Tollens and more",focus:true,
 intro:"Recognize the standard valid patterns and distinguish them from similar-looking invalid ones.",
 goals:["Apply Modus Ponens and Modus Tollens.","Recognize Hypothetical and Disjunctive Syllogism.","Identify converse and inverse fallacies."],
 sections:[
 {title:"1. The central rules",body:"Modus Ponens (MP) uses p → q and p to conclude q. Modus Tollens (MT) uses p → q and ¬q to conclude ¬p. Both work for any propositions p and q.",formula:"MP:  p → q, p  ∴ q\nMT:  p → q, ¬q ∴ ¬p"},
 {title:"2. Other useful inference rules",body:"Hypothetical Syllogism (HS): chain two implications. Disjunctive Syllogism (DS): eliminate a false alternative. Conjunction: combine two established truths. Simplification: take one conjunct. Addition: add an alternative to a known truth.",formula:"HS: p→q, q→r ∴ p→r\nDS: p∨q, ¬p ∴ q\nConjunction: p, q ∴ p∧q\nSimplification: p∧q ∴ p\nAddition: p ∴ p∨q"},
 {title:"3. Invalid patterns worth memorizing",body:"Affirming the consequent incorrectly reasons from p → q and q to p. Denying the antecedent incorrectly reasons from p → q and ¬p to ¬q. Neither pattern guarantees the conclusion.",formula:"INVALID: p→q, q ∴ p\nINVALID: p→q, ¬p ∴ ¬q"}
 ],examples:[
 {title:"Modus Tollens",question:"If the alarm is set, the light blinks. The light is not blinking. What can you conclude?",steps:["Let a = alarm is set; b = light blinks.","Given a → b and ¬b.","By Modus Tollens, conclude ¬a."]},
 {title:"Chain implications",question:"If A then B. If B then C. A is true. Prove C.",steps:["From A → B and B → C, infer A → C by Hypothetical Syllogism.","Given A, apply Modus Ponens to A → C.","Conclusion: C."]}
 ],trap:"From 'If it rains, the ground is wet' and 'the ground is wet', you CANNOT infer it rained. A sprinkler is another possibility."
},
{
 week:6,title:"Validity & logical fallacies",short:"Testing argument forms and detecting invalid reasoning",focus:true,
 intro:"Combine translation, truth tables and inference rules to determine whether reasoning is valid.",
 goals:["Test validity with a truth table.","Use a counterexample to establish invalidity.","Recognize common formal and informal fallacies."],
 sections:[
 {title:"1. The validity test",body:"An argument is valid if there is NO row where every premise is true and the conclusion is false. To test it, write the premises and conclusion as separate truth-table columns, then inspect only rows in which every premise is true.",formula:"Valid ⇔ (P₁ ∧ P₂ ∧ … ∧ Pₙ) → C is a tautology",note:"A single row with all true premises and a false conclusion proves invalidity."},
 {title:"2. Counterexamples and deductive chains",body:"To show an argument invalid, construct an assignment making all premises true and the conclusion false. To show it valid, establish a recognized inference-rule derivation or show there is no counterexample in the complete truth table."},
 {title:"3. Common fallacies",body:"Formal fallacies include affirming the consequent and denying the antecedent. Informal fallacies include ad hominem (attacking a person instead of their reasoning), straw man (misrepresenting a position), false dilemma (pretending only two choices exist), and hasty generalization (generalizing from too little evidence).",formula:"Counterexample to p→q, q ∴ p: choose p=F and q=T."}
 ],examples:[
 {title:"Test an invalid argument",question:"Premises: p → q and q. Claimed conclusion: p.",steps:["Select p = F, q = T.","Then p → q = T and q = T: both premises hold.","But p = F: the conclusion fails.","Therefore the argument is invalid."]},
 {title:"Show a valid argument",question:"Premises: p ∨ q and ¬p. Conclusion: q.",steps:["If ¬p is true, p is false.","Since p ∨ q is true and p is false, q must be true.","This is Disjunctive Syllogism, so the argument is valid."]}
 ],trap:"A valid argument with an untrue premise does not establish a true conclusion about the world; validity describes the logical connection."
},
{
 week:7,title:"Set theory & Venn diagrams",short:"Unions, intersections, complements and set proofs",focus:false,
 intro:"Learn set notation, diagram regions and the algebraic laws governing collections of objects.",
 goals:["Calculate unions, intersections, differences and complements.","Interpret Venn diagram regions.","Apply set identities and prove simple statements."],
 sections:[
 {title:"1. Set fundamentals",body:"A set is a collection of distinct elements. Membership is written x ∈ A. The empty set ∅ has no elements. A ⊆ B means every element of A belongs to B. The universal set U supplies the context for complements."},
 {title:"2. Basic set operations",body:"A ∪ B contains elements in A OR B; A ∩ B contains elements in both. A − B keeps the elements of A not in B. The complement Aᶜ includes elements of U outside A. Venn diagrams show these regions visually.",formula:"A ∪ B = {x : x∈A or x∈B}\nA ∩ B = {x : x∈A and x∈B}\nA − B = A ∩ Bᶜ"},
 {title:"3. Counting and De Morgan's laws",body:"For two finite sets, subtract the overlap to avoid double counting. De Morgan's laws also apply to sets. In a set proof, show both directions of membership to establish equality.",formula:"|A ∪ B| = |A| + |B| − |A ∩ B|\n(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ\n(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ"}
 ],examples:[
 {title:"Find union and intersection",question:"A={1,2,3}, B={3,4,5}.",steps:["Union A∪B lists each member once: {1,2,3,4,5}.","Intersection A∩B contains shared members: {3}.","Difference A−B contains members only in A: {1,2}."]},
 {title:"Count students",question:"22 take maths, 17 take computing, 8 take both. How many take at least one?",steps:["Use |A∪B|=|A|+|B|−|A∩B|.","Substitute: 22+17−8=31.","Answer: 31 students."]}
 ],trap:"The empty set ∅ is not the same as {∅}; the latter has one element."
},
{
 week:8,title:"Direct & contrapositive proofs",short:"Proving statements with definitions and implications",focus:false,
 intro:"Write short, rigorous proofs using algebra and the exact definitions of even, odd and divisibility.",
 goals:["Structure a direct proof of p → q.","Use the equivalent contrapositive ¬q → ¬p.","Distinguish evidence from general proof."],
 sections:[
 {title:"1. The language of proof",body:"To prove a universal implication, assume its premise for an arbitrary element, then use definitions and valid steps to establish the conclusion. A number n is even if n=2k for an integer k, and odd if n=2k+1."},
 {title:"2. Direct proof",body:"A direct proof starts by assuming p, derives consequences, and ends at q. Each symbolic step must be justified. Testing a few examples does not prove a statement for every integer.",formula:"To prove p → q:\nAssume p. Use definitions and algebra. Conclude q."},
 {title:"3. Contrapositive proof",body:"p → q and ¬q → ¬p are logically equivalent. Sometimes it is easier to assume the desired conclusion is false and prove the hypothesis was false. This is different from the converse q → p.",formula:"p → q ≡ ¬q → ¬p"}
 ],examples:[
 {title:"Direct: sum of even integers is even",question:"Suppose a and b are even integers.",steps:["Write a=2m and b=2n for integers m and n.","Then a+b=2m+2n=2(m+n).","Since m+n is an integer, a+b is even."]},
 {title:"Contrapositive: n² even ⇒ n even",question:"Prove this for every integer n.",steps:["Contrapositive: if n is odd, then n² is odd.","Let n=2k+1 for an integer k.","n²=4k²+4k+1=2(2k²+2k)+1, which is odd.","The contrapositive holds, so the original implication holds."]}
 ],trap:"To prove a statement about ALL integers, testing n=2, 4 and 6 is not enough."
},
{
 week:9,title:"Contradiction & induction",short:"Indirect proof and mathematical induction",focus:false,
 intro:"Learn two major techniques for establishing a mathematical statement across many possible cases.",
 goals:["Set up a proof by contradiction.","Identify the base case and induction step.","Prove a summation formula by induction."],
 sections:[
 {title:"1. Proof by contradiction",body:"Assume the target statement is false. Use legitimate reasoning to derive an impossibility such as R ∧ ¬R. The assumption must therefore be false, establishing the target claim.",formula:"Assume ¬P → derive a contradiction → conclude P"},
 {title:"2. Mathematical induction",body:"Induction proves a statement P(n) for all integers n at or above a starting value. First prove the base case. Then assume P(k) for an arbitrary k and show P(k+1). Both steps are essential.",formula:"Base: prove P(1)\nStep: assume P(k); prove P(k+1)\nConclusion: ∀n ≥ 1, P(n)"},
 {title:"3. A key summation formula",body:"A classic induction exercise proves the sum of the first n positive integers. In the induction step, append the (k+1)th term, then simplify to the same formula with k+1 in place of n.",formula:"1 + 2 + ⋯ + n = n(n+1)/2"}
 ],examples:[
 {title:"Induction: sum of first n integers",question:"Prove 1+2+⋯+n=n(n+1)/2 for n≥1.",steps:["Base n=1: left 1; right 1(2)/2=1.","Assume 1+⋯+k=k(k+1)/2.","Then 1+⋯+k+(k+1)=k(k+1)/2+(k+1).","Factor: (k+1)(k+2)/2, the formula for k+1.","By induction, it holds for every n≥1."]},
 {title:"Contradiction: no smallest positive rational",question:"Assume a smallest positive rational r exists.",steps:["Suppose r is the smallest positive rational.","The number r/2 is rational and positive.","But 0<r/2<r, contradicting that r is smallest.","Therefore no smallest positive rational exists."]}
 ],trap:"Never omit the base case, and do not assume P(k+1) in the inductive hypothesis."
},
{
 week:10,title:"Combinatorics",short:"Counting, permutations and combinations",focus:false,
 intro:"Decide when ordering matters, then choose the correct counting rule or formula.",
 goals:["Apply the product rule and factorials.","Calculate nPr when order matters.","Calculate nCr when order does not matter."],
 sections:[
 {title:"1. Counting rules",body:"The product rule multiplies the numbers of independent sequential choices. For example, 3 shirts and 4 trousers produce 3×4=12 outfits. For independent alternative cases that cannot overlap, use the sum rule.",formula:"n! = n(n−1)(n−2)⋯1, with 0! = 1"},
 {title:"2. Permutations: order matters",body:"Use permutations for ordered selections such as 1st, 2nd and 3rd place, or arranging distinct books. Selecting r distinct items from n without replacement in order gives nPr.",formula:"P(n,r) = n! / (n−r)!"},
 {title:"3. Combinations: order does not matter",body:"Use combinations for groups or committees. Selecting the same members in a different order does not create a new group. If objects repeat, special counting considerations apply.",formula:"C(n,r) = n! / [r!(n−r)!]\nC(n,r) = C(n,n−r)"}
 ],examples:[
 {title:"Permutation",question:"How many ways to award gold, silver and bronze to 5 runners?",steps:["Order matters; select and arrange 3 out of 5.","P(5,3)=5!/(5−3)!=5×4×3.","Answer: 60."]},
 {title:"Combination",question:"How many 3-person teams can be chosen from 5 students?",steps:["Order does not matter.","C(5,3)=5!/(3!2!)=(5×4)/(2×1).","Answer: 10."]}
 ],trap:"A committee is usually a combination; ranked positions or assigned distinct roles are usually permutations."
},
{
 week:11,title:"Relations & functions",short:"Properties, composition, closure and function operations",focus:false,
 intro:"Understand relations between sets, their properties, and how to evaluate or combine functions.",
 goals:["Recognize reflexive, symmetric, antisymmetric and transitive relations.","Understand relation composition and closures.","Evaluate function arithmetic and composition."],
 sections:[
 {title:"1. Binary relations",body:"A binary relation R on A is any subset of A×A. Reflexive means (a,a)∈R for every a. Symmetric means aRb implies bRa. Antisymmetric means aRb and bRa together imply a=b. Transitive means aRb and bRc imply aRc."},
 {title:"2. Equivalence and order relations",body:"An equivalence relation is reflexive, symmetric and transitive. A partial order is reflexive, antisymmetric and transitive. Reflexive closure adds missing diagonal pairs; symmetric closure adds missing reversed pairs; transitive closure adds pairs needed to connect paths.",formula:"R ⊆ A × A\nR∘S = {(a,c) : ∃b ((a,b)∈S ∧ (b,c)∈R)}",note:"Composition uses S first and then R in the convention shown."},
 {title:"3. Functions and operations",body:"A function assigns every input in its domain exactly one output. For functions f and g, (f+g)(x)=f(x)+g(x) and (fg)(x)=f(x)g(x) where defined. Composition (f∘g)(x) means apply g first and then f.",formula:"(f ∘ g)(x) = f(g(x))\n(f + g)(x) = f(x) + g(x)"}
 ],examples:[
 {title:"Determine properties",question:"On A={1,2}, let R={(1,1),(2,2),(1,2)}.",steps:["Reflexive: yes, both diagonal pairs exist.","Symmetric: no, (1,2) exists but (2,1) does not.","Antisymmetric: yes, no distinct pair occurs in both directions.","Transitive: yes, all required compositions are present."]},
 {title:"Function composition",question:"If f(x)=2x+1 and g(x)=x², find (f∘g)(3).",steps:["Compute the inner function first: g(3)=3²=9.","Then f(9)=2(9)+1=19.","Answer: (f∘g)(3)=19."]}
 ],trap:"Antisymmetric does NOT mean 'not symmetric'. A relation can be both symmetric and antisymmetric (for example equality)."
}
];

const FLASHCARDS = [
[1,"What is a proposition?","A declarative sentence that is either true or false."],[1,"When is p → q false?","Only when p is true and q is false."],[1,"When is p ∧ q true?","When both p and q are true."],[1,"What does p ↔ q mean?","p and q have the same truth value."],[1,"Is logical OR inclusive?","Yes. p ∨ q is true when one or both are true."],
[2,"How many rows for n logical variables?","2ⁿ rows."],[2,"State De Morgan's law for a conjunction.","¬(p ∧ q) ≡ ¬p ∨ ¬q."],[2,"Rewrite p → q without →.","¬p ∨ q."],[2,"What is a tautology?","An expression true on every truth-table row."],[2,"What is a contradiction?","An expression false on every truth-table row."],
[3,"Negate ∀x P(x).","∃x ¬P(x)."],[3,"Negate ∃x P(x).","∀x ¬P(x)."],[3,"What does ∃ mean?","There exists at least one."],[3,"What disproves ∀x P(x)?","One counterexample with P(x) false."],[3,"How do you express 'every A is B'?","∀x(A(x) → B(x))."],
[4,"Premise vs conclusion?","Premises provide assumptions; the conclusion is what is claimed to follow."],[4,"What does ∴ mean?","Therefore."],[4,"What is a valid argument?","There is no case where all premises are true and the conclusion is false."],[4,"What is universal instantiation?","From ∀x P(x), infer P(a) for a member a of the domain."],
[5,"State Modus Ponens.","p → q; p; therefore q."],[5,"State Modus Tollens.","p → q; ¬q; therefore ¬p."],[5,"State Disjunctive Syllogism.","p ∨ q; ¬p; therefore q."],[5,"State Hypothetical Syllogism.","p → q; q → r; therefore p → r."],[5,"What is affirming the consequent?","Invalid: p → q; q; therefore p."],
[6,"How does a truth table disprove validity?","Find a row with all premises true and the conclusion false."],[6,"What is denying the antecedent?","Invalid: p → q; ¬p; therefore ¬q."],[6,"What is an ad hominem fallacy?","Attacking a person instead of their argument."],[6,"What is a false dilemma?","Presenting only two possibilities when more exist."],
[7,"What is A ∩ B?","Elements that belong to both A and B."],[7,"What is A ∪ B?","Elements that belong to A or B or both."],[7,"How do you count |A ∪ B|?","|A| + |B| − |A ∩ B|."],[7,"What is A − B?","Elements in A but not in B."],
[8,"What form does an even integer take?","n = 2k for some integer k."],[8,"What form does an odd integer take?","n = 2k+1 for some integer k."],[8,"What is the contrapositive of p → q?","¬q → ¬p."],[8,"Does checking examples prove ∀n P(n)?","No. You need a general proof."],
[9,"What are the steps of induction?","Base case; assume P(k); prove P(k+1)."],[9,"Sum of the first n positive integers?","n(n+1)/2."],[9,"How does contradiction work?","Assume the negation and derive an impossibility."],[9,"Can induction omit the base case?","No; both the base case and step are needed."],
[10,"Permutation or combination for a committee?","Combination (order does not matter)."],[10,"Permutation formula?","P(n,r)=n!/(n−r)!."],[10,"Combination formula?","C(n,r)=n!/[r!(n−r)!]."],[10,"What is 0!?","1."],
[11,"When is a relation reflexive?","When every a is related to itself."],[11,"When is a relation symmetric?","Whenever aRb, also bRa."],[11,"When is a relation transitive?","Whenever aRb and bRc, also aRc."],[11,"What is (f∘g)(x)?","f(g(x)); apply g first."],[11,"What makes a function a function?","Every input has exactly one output."]
];

const REFERENCES = [
 {title:"Logical operators",items:[["NOT","¬p : flips truth value"],["AND","p ∧ q : both true"],["OR","p ∨ q : at least one true"],["Implication","p → q : false only for T → F"],["Biconditional","p ↔ q : equal truth values"],["Rows","n variables require 2ⁿ rows"]]},
 {title:"Logical equivalences",items:[["De Morgan 1","¬(p∧q) ≡ ¬p∨¬q"],["De Morgan 2","¬(p∨q) ≡ ¬p∧¬q"],["Conditional","p→q ≡ ¬p∨q"],["Contrapositive","p→q ≡ ¬q→¬p"],["Double negation","¬¬p ≡ p"],["Absorption","p∨(p∧q) ≡ p"]]},
 {title:"Quantifiers & negation",items:[["Universal","∀x P(x) : for every x"],["Existential","∃x P(x) : at least one x"],["Negate all","¬∀x P(x) ≡ ∃x ¬P(x)"],["Negate some","¬∃x P(x) ≡ ∀x ¬P(x)"],["All A are B","∀x(A(x)→B(x))"],["Some A are B","∃x(A(x)∧B(x))"]]},
 {title:"Rules of inference",items:[["Modus Ponens","p→q, p ⊢ q"],["Modus Tollens","p→q, ¬q ⊢ ¬p"],["Hypothetical Syllogism","p→q, q→r ⊢ p→r"],["Disjunctive Syllogism","p∨q, ¬p ⊢ q"],["Simplification","p∧q ⊢ p"],["Validity","No row: all premises T and conclusion F"]]},
 {title:"Set theory",items:[["Union","A ∪ B : either or both"],["Intersection","A ∩ B : in both"],["Difference","A−B = A∩Bᶜ"],["Counting union","|A∪B| = |A|+|B|−|A∩B|"],["De Morgan","(A∪B)ᶜ = Aᶜ∩Bᶜ"]]},
 {title:"Proof methods",items:[["Even and odd","Even: 2k; odd: 2k+1"],["Direct proof","Assume p, derive q"],["Contrapositive","Assume ¬q, derive ¬p"],["Contradiction","Assume ¬P, derive impossibility"],["Induction","Base P(1); P(k) ⇒ P(k+1)"],["Arithmetic sum","1+⋯+n=n(n+1)/2"]]},
 {title:"Combinatorics",items:[["Factorial","n! = n(n−1)⋯1; 0!=1"],["Permutation","P(n,r) = n!/(n−r)!"],["Combination","C(n,r) = n!/[r!(n−r)!]"],["Symmetry","C(n,r) = C(n,n−r)"],["Product rule","m independent choices × n choices = mn"]]},
 {title:"Relations & functions",items:[["Reflexive","aRa for every a"],["Symmetric","aRb ⇒ bRa"],["Antisymmetric","aRb ∧ bRa ⇒ a=b"],["Transitive","aRb ∧ bRc ⇒ aRc"],["Equivalence","Reflexive + symmetric + transitive"],["Composition","(f∘g)(x) = f(g(x))"]]}
];

// Question format: [week, question, [A, B, C, D], correctOptionIndex, explanation]
const QUESTIONS = [
[1,"Which sentence is a proposition?",["Please open the window.","What is your age?","11 is a prime number.","Study harder!"],2,"A proposition must be a declarative statement with a truth value. 11 is prime is true."],
[1,"If p=T and q=F, what is p ∧ q?",["T","F","Both","Undefined"],1,"Conjunction is true only when both operands are true."],
[1,"If p=F and q=T, what is p ∨ q?",["F","T","Undefined","Neither"],1,"Inclusive OR is true whenever at least one operand is true."],
[1,"Which assignment makes p → q FALSE?",["p=T, q=T","p=F, q=F","p=F, q=T","p=T, q=F"],3,"The only false case for implication is true antecedent and false consequent."],
[1,"When is p ↔ q true?",["Only when p is T","When p and q differ","When p and q agree","Only when q is F"],2,"A biconditional is true when both sides have the same truth value."],
[1,"What is ¬p if p is false?",["False","True","Unknown","Both"],1,"Negation reverses the truth value."],
[1,"Translate 'p and not q'.",["p ∨ ¬q","¬p ∧ q","p ∧ ¬q","¬(p ∨ q)"],2,"'And' means ∧ and 'not q' is ¬q."],
[1,"In standard propositional logic, 'p or q' is:",["Exclusive only","Inclusive","Always false","Always true"],1,"Logical ∨ is inclusive: both p and q may be true."],
[1,"If p=F and q=F, find p → q.",["False","True","Cannot determine","Contradiction"],1,"Implication with a false antecedent is true in the truth-table definition."],
[1,"How many propositional variables appear in (p ∧ q) ∨ ¬r?",["1","2","3","4"],2,"The distinct variables are p, q and r."],
[1,"Find ¬(T ∨ F).",["T","F","Both","Undefined"],1,"T ∨ F is true; negating gives false."],
[1,"If p=T and q=T, find ¬p ∨ q.",["F","T","Undefined","Cannot tell"],1,"¬p is false; false OR true = true."],

[2,"How many rows does a truth table with 3 variables have?",["3","6","8","9"],2,"For n independent variables, construct 2ⁿ rows: 2³=8."],
[2,"Which is a tautology?",["p ∧ ¬p","p ∨ ¬p","p → ¬p","p ∧ q"],1,"Excluded middle p ∨ ¬p is true for both possible values of p."],
[2,"Which is a contradiction?",["p ∧ ¬p","p ∨ ¬p","p → p","p ↔ p"],0,"p and not p cannot both be true."],
[2,"What is equivalent to ¬(p ∧ q)?",["¬p ∧ ¬q","p ∨ q","¬p ∨ ¬q","p → q"],2,"By De Morgan's law, negate both terms and switch AND to OR."],
[2,"What is equivalent to p → q?",["p ∨ q","¬p ∨ q","p ∧ ¬q","q → p"],1,"Material implication satisfies p → q ≡ ¬p ∨ q."],
[2,"What is the negation of p → q?",["¬p → ¬q","p ∧ ¬q","¬p ∧ q","q → p"],1,"Negation of an implication is p AND not q."],
[2,"Two formulas are logically equivalent when:",["They use the same letters","They have the same final truth-table column","Both have an implication","They each have at least one true row"],1,"Logical equivalence requires matching truth values for every variable assignment."],
[2,"Which is equivalent to ¬(p ∨ q)?",["¬p ∧ ¬q","¬p ∨ ¬q","p ∧ q","p → q"],0,"De Morgan: NOT(OR) = AND of negations."],
[2,"What is ¬¬p equivalent to?",["¬p","p","p ∧ ¬p","F"],1,"Double negation restores p."],
[2,"How many rows for 4 distinct propositional variables?",["8","12","16","24"],2,"2⁴ = 16 possible truth assignments."],
[2,"What kind of expression has both true and false rows?",["Tautology","Contradiction","Contingency","Equivalence"],2,"A contingency is sometimes true and sometimes false."],
[2,"Which expression is equivalent to p ↔ q?",["p ∧ q","(p → q) ∧ (q → p)","p ∨ q","p → ¬q"],1,"A biconditional requires both directions of implication."],

[3,"The symbol ∀ means:",["There exists","For all","Implies","And"],1,"∀ is the universal quantifier: for every member of the domain."],
[3,"The symbol ∃ means:",["At least one exists","Exactly one exists","Every one exists","None exists"],0,"The existential quantifier requires one or more witnesses, not exactly one."],
[3,"Negate ∀x P(x).",["∀x ¬P(x)","∃x ¬P(x)","∃x P(x)","¬∃x ¬P(x)"],1,"Negating ∀ produces ∃ with the predicate negated."],
[3,"Negate ∃x P(x).",["∀x ¬P(x)","∃x ¬P(x)","∀x P(x)","P(x)"],0,"There are no witnesses exactly when every element fails P."],
[3,"A single counterexample can disprove:",["∃x P(x)","∀x P(x)","P(a) for a fixed true a","Nothing"],1,"One element not satisfying P is enough to disprove a universal statement."],
[3,"Over all people, 'every student studies' is:",["∀x(S(x) ∧ T(x))","∃x(S(x) ∧ T(x))","∀x(S(x) → T(x))","∃x(S(x) → T(x))"],2,"Use universal implication: anyone who is a student must study."],
[3,"Over all people, 'some students study' is:",["∀x(S(x) → T(x))","∃x(S(x) ∧ T(x))","∀x(S(x) ∧ T(x))","∃x(S(x) → T(x))"],1,"Existential 'some A are B' combines both properties with ∧."],
[3,"What is a predicate P(x)?",["A statement with a variable whose truth depends on its value","A sentence that is always false","An operator for implication","A number"],0,"A predicate becomes a proposition when its variable is assigned or quantified."],
[3,"Negate 'Everyone passed the exam'.",["Nobody passed","At least one person did not pass","Everyone failed","At least one person passed"],1,"The negation of 'everyone' is 'someone did not'."],
[3,"Are ∀x∃y R(x,y) and ∃y∀x R(x,y) always equivalent?",["Yes","No","Only when R is false","Only when the domain is empty"],1,"The first allows a different y for each x; the second requires a single y for all x."],
[3,"To show ∃x P(x) is true, it is sufficient to:",["Check every x","Give one witness satisfying P","Find one failure","Prove a contradiction"],1,"One valid witness establishes an existential claim."],
[3,"If the domain is {1,2,3}, is ∃x(x²=4) true?",["No","Yes, using x=2","Yes, using x=3","It is undefined"],1,"x=2 is in the domain and satisfies x²=4."],

[4,"A logical argument consists of:",["Only a conclusion","Premises and a conclusion","Only variables","A truth table only"],1,"Premises are assumptions offered in support of a conclusion."],
[4,"What does ∴ represent?",["And","Or","Therefore","Not"],2,"∴ introduces the conclusion of an argument."],
[4,"Symbolize 'If A, then B; A; therefore B'.",["A→B, B ∴ A","A∨B, A ∴ B","A→B, A ∴ B","A∧B ∴ ¬B"],2,"This is the classic Modus Ponens argument pattern."],
[4,"If every human is mortal and Socrates is human, the conclusion is:",["All humans are Socrates","Socrates is mortal","Socrates is not human","Nothing follows"],1,"Instantiate the universal premise for Socrates, then apply Modus Ponens."],
[4,"A valid argument is one in which:",["All premises must be factually true","The conclusion is never false","True premises cannot lead to a false conclusion","All statements are tautologies"],2,"Validity rules out an assignment with all premises true and conclusion false."],
[4,"From ∀x P(x), what may be inferred for a named a in the domain?",["¬P(a)","∃x ¬P(x)","P(a)","Nothing"],2,"Universal instantiation applies a universal claim to each member of its domain."],
[4,"Symbolize 'All cats are mammals' over all animals.",["∃x(C(x) ∧ M(x))","∀x(C(x)→M(x))","∀x(C(x)∧M(x))","∀x(M(x)→C(x))"],1,"The condition 'if x is a cat' implies 'x is a mammal'."],
[4,"What is the role of a premise?",["It states the claimed final conclusion","It is an assumption used to derive the conclusion","It must contain ∀","It always contains a negation"],1,"Premises are the assumptions from which the conclusion is argued."],
[4,"If ∀x(P(x)→Q(x)) and P(a) hold, which rule finishes the argument after instantiation?",["Modus Ponens","Addition","Contradiction","Denying antecedent"],0,"Instantiate P(a)→Q(a), then use P(a) to infer Q(a) by MP."],
[4,"What does the expression P₁ ∧ P₂ → C test (with the premises grouped)?",["Whether a single proposition is false","Whether premises jointly imply a conclusion","Whether C is always false","The number of variables"],1,"A valid argument has the conditional (P₁ ∧ P₂) → C as a tautology."],
[4,"If an argument is valid but its premises are false, which is correct?",["The argument is automatically invalid","Its conclusion is automatically false","Validity still concerns its logical form","Its conclusion must be true"],2,"Truth of premises and validity of the inference are distinct concepts."],
[4,"If p stands for 'server works' and q for 'email sends', how is 'If server works then email sends' written?",["q→p","p∧q","p→q","p∨¬q"],2,"The antecedent is p and the consequent is q."],

[5,"What is Modus Ponens?",["p→q, p ∴ q","p→q, q ∴ p","p→q, ¬p ∴ ¬q","p∨q, ¬q ∴ ¬p"],0,"Modus Ponens affirms the antecedent of a conditional."],
[5,"What is Modus Tollens?",["p→q, p ∴ q","p→q, ¬q ∴ ¬p","p→q, q ∴ p","p∧q ∴ p∨q"],1,"Modus Tollens denies the consequent and infers denial of the antecedent."],
[5,"p→q and q→r imply:",["r→p","p→r","q→p","¬p→r"],1,"Hypothetical Syllogism chains implications."],
[5,"From p∨q and ¬p, conclude:",["p","¬q","q","p∧q"],2,"Disjunctive Syllogism eliminates one disjunct."],
[5,"Which argument is INVALID?",["p→q, p ∴ q","p→q, ¬q ∴ ¬p","p→q, q ∴ p","p∨q, ¬p ∴ q"],2,"Inferring p from p→q and q is affirming the consequent."],
[5,"From p∧q, which follows by simplification?",["¬p","p","¬q","¬p∨¬q"],1,"A true conjunction guarantees each conjunct is true."],
[5,"From p and q, which follows by conjunction?",["p→¬q","¬p∨q","p∧q","p↔¬q"],2,"Conjunction combines two separately established propositions."],
[5,"From p alone, which follows by addition?",["p∨q","p∧q","q","¬p"],0,"An OR statement is true if one disjunct, p, is already true."],
[5,"'If I study, I pass. I did not pass. Therefore, I did not study.' is:",["Affirming the consequent","Modus Tollens","Modus Ponens","Denying the antecedent"],1,"It follows p→q, ¬q ∴ ¬p."],
[5,"'If the bus arrives, I am on time. The bus did not arrive; I am late.' is:",["Valid Modus Ponens","Valid Modus Tollens","Invalid denying the antecedent","Valid conjunction"],2,"p→q, ¬p ∴ ¬q is not valid; another mode of transport may keep you on time."],
[5,"Which rule concludes q from p∨q and ¬p?",["Simplification","Disjunctive Syllogism","Hypothetical Syllogism","Conjunction"],1,"This is exactly the disjunctive syllogism form."],
[5,"Which pattern is Hypothetical Syllogism?",["p∧q ∴ q","p→q, q→r ∴ p→r","p→q, ¬q ∴ ¬p","p ∴ p∨q"],1,"HS chains two conditionals sharing the middle statement q."],

[6,"An argument is invalid if:",["Its premises are unpopular","Its conclusion is sometimes false","At least one row has all true premises and a false conclusion","It contains a conditional"],2,"One countermodel is enough to establish invalidity."],
[6,"Which assignment refutes p→q, q ∴ p?",["p=T,q=T","p=F,q=T","p=T,q=F","p=F,q=F"],1,"For p=F,q=T, both premises hold but the conclusion p is false."],
[6,"Attacking a speaker instead of their claim is:",["Ad hominem","Modus Ponens","Induction","Disjunction"],0,"Ad hominem is an informal fallacy targeting the person rather than the argument."],
[6,"Misrepresenting an opponent's claim so it is easier to attack is:",["False dilemma","Straw man","Contrapositive","Modus Tollens"],1,"A straw man substitutes a distorted, weaker version of a position."],
[6,"Assuming there are only two choices when others exist is:",["Hasty generalization","False dilemma","Distributive law","Tautology"],1,"False dilemma artificially restricts available options."],
[6,"Drawing a conclusion about everyone from two cases is often:",["Hypothetical Syllogism","Hasty generalization","Universal instantiation","Conjunction"],1,"A tiny or unrepresentative sample cannot justify a sweeping conclusion."],
[6,"What would establish that p∨q, ¬p ∴ q is valid?",["A row with premises true, conclusion false","A valid inference rule such as Disjunctive Syllogism","A false real-world premise","A missing truth-table row"],1,"The argument is an instance of DS, which is valid."],
[6,"For validity by truth table, inspect rows where:",["The conclusion is true","At least one premise is false","All premises are true","Every variable is false"],2,"Only rows satisfying all premises can serve as counterexamples."],
[6,"Affirming the consequent has which form?",["p→q, q ∴ p","p→q, p ∴ q","p→q, ¬q ∴ ¬p","p∧q ∴ p"],0,"This invalid form assumes q can only arise from p."],
[6,"If a single counterexample exists, the argument is:",["Sound","Valid","Invalid","A tautology"],2,"A true-premises/false-conclusion row disproves validity."],
[6,"What is a sound argument?",["A valid argument with true premises","An invalid argument with true premises","Any argument with a true conclusion","An argument with no conclusion"],0,"Soundness combines validity with truth of premises."],
[6,"Which is NOT a reliable validity test?",["Use an inference-rule derivation","Show the associated conditional is a tautology","Find no counterexample in a complete truth table","Check that the conclusion sounds plausible"],3,"Plausibility alone is not a proof of valid inference."],

[7,"A={1,2,3} and B={3,4}. What is A∩B?",["{1,2,3,4}","{3}","{1,2}","∅"],1,"Intersection contains elements common to both sets."],
[7,"For A={1,2,3}, B={3,4}, find A∪B.",["{3}","{1,2}","{1,2,3,4}","{4}"],2,"Union includes every distinct member of either set."],
[7,"A={1,2,3}, B={2,4}. Find A−B.",["{1,3}","{2}","{4}","{1,2,3,4}"],0,"Remove from A any element also in B."],
[7,"If |A|=12, |B|=9 and |A∩B|=4, find |A∪B|.",["25","17","21","5"],1,"Use inclusion-exclusion: 12+9−4=17."],
[7,"Which is De Morgan's law for sets?",["(A∪B)ᶜ=Aᶜ∩Bᶜ","(A∪B)ᶜ=Aᶜ∪Bᶜ","A−B=B−A","A∪B=A∩B"],0,"The complement of a union equals the intersection of complements."],
[7,"What is |∅|?",["1","0","Undefined","Infinite"],1,"The empty set has zero elements."],
[7,"If A ⊆ B, then which must hold?",["A∩B=A","A∩B=∅","B⊆A","A∪B=A"],0,"Every element of A already belongs to B; their intersection is A."],
[7,"Which set is a universal set?",["The empty set","The set of all objects under discussion","Only the intersection","Any singleton"],1,"U defines the full domain relative to which complements are taken."],

[8,"An even integer n can be written as:",["2k+1","2k","k/2","2k−1"],1,"The definition of even is n=2k for some integer k."],
[8,"What is the contrapositive of p→q?",["q→p","¬p→¬q","¬q→¬p","p→¬q"],2,"Contrapositive swaps the sides and negates both."],
[8,"Which method assumes the premise and derives the conclusion?",["Direct proof","Contradiction","Induction","Exhaustive search only"],0,"Direct proof establishes p→q by proceeding from p to q."],
[8,"The sum of two even integers is even because:",["2a+2b=2(a+b)","2a+2b=2(a+b)+1","Even numbers cannot be added","All odd numbers are prime"],0,"Factoring out 2 shows the sum is a multiple of 2."],
[8,"Which is logically equivalent to 'if n² is even then n is even'?",["If n is even then n² is even","If n is odd then n² is odd","If n² is odd then n is odd","If n is odd then n² is even"],1,"The contrapositive negates conclusion and premise: n odd implies n² odd."],
[8,"Can testing 100 values prove a claim for all integers?",["Always","Only for even claims","No, not in general","If all values are positive"],2,"A universal theorem requires reasoning that covers all values in its domain."],
[8,"An odd integer has which form?",["2k","2k+1","k²","4k"],1,"An odd integer is exactly one more than an even integer."],
[8,"What is the converse of p→q?",["¬q→¬p","q→p","¬p→¬q","p∧q"],1,"The converse swaps hypothesis and conclusion without negating."],

[9,"What is the first step in mathematical induction?",["Assume P(k+1)","Prove the base case","Conclude P(n)","Assume every claim"],1,"The base case anchors the induction chain."],
[9,"What is the induction hypothesis?",["Assume P(k) for an arbitrary k","Assume P(k+1)","Assume P(0) is false","Assume the theorem is false"],0,"The induction step assumes P(k) and uses it to prove P(k+1)."],
[9,"Find 1+2+3+4+5.",["10","12","15","20"],2,"The first five integers sum to 5(6)/2=15."],
[9,"Proof by contradiction begins by:",["Assuming the target statement is false","Checking many numerical values","Assuming the theorem true","Drawing a Venn diagram"],0,"Assume ¬P and derive an impossibility, then infer P."],
[9,"In the induction step, what must you prove?",["P(k) given P(k+1)","P(k+1) given P(k)","Only P(1)","Only P(2)"],1,"The inductive step advances the assertion from k to k+1."],
[9,"If the base case fails, the proposed induction proof is:",["Still complete","Incomplete or incorrect","Automatically valid","A direct proof"],1,"Without a valid base, the chain has no starting point."],
[9,"For n=4, n(n+1)/2 equals:",["8","9","10","12"],2,"4×5/2 = 10."],
[9,"A contradiction is best represented by:",["p∨¬p","p∧¬p","p→p","p↔p"],1,"A proposition and its negation cannot both be true."],

[10,"Select 3 students from 8 for an unordered committee. Which formula?",["P(8,3)","C(8,3)","8³","8+3"],1,"A committee is an unordered selection, so use combinations."],
[10,"How many ways to award 1st and 2nd place among 5 people?",["10","15","20","25"],2,"P(5,2)=5×4=20 because order matters."],
[10,"Calculate C(5,2).",["10","20","25","5"],0,"5!/(2!3!) = (5×4)/2 = 10."],
[10,"Calculate P(4,3).",["4","12","24","64"],2,"4×3×2 = 24."],
[10,"What is 0!?",["0","1","Undefined","Infinity"],1,"By definition, 0!=1."],
[10,"You have 3 shirts and 4 trousers. How many outfits?",["7","12","24","1"],1,"By the product rule: 3×4=12 combinations of choices."],
[10,"Which is equal to C(n,r)?",["C(n,n−r)","P(n,r)","n!","C(r,n) for every n,r"],0,"Choosing r items corresponds one-to-one with choosing the n−r items to omit."],
[10,"How many distinct arrangements of A, B, C?",["3","6","9","27"],1,"3!=3×2×1=6."],

[11,"A relation R on A is reflexive if:",["(a,a)∈R for every a∈A","aRb implies bRa","aRb implies a=b","No pairs are allowed"],0,"Reflexivity requires every diagonal pair."],
[11,"A relation is symmetric if:",["aRb ⇒ bRa","aRb ∧ bRa ⇒ a=b","aRb ∧ bRc ⇒ aRc","aRa for all a"],0,"Symmetry requires the reverse of every related pair."],
[11,"A relation is transitive if:",["aRb implies bRa","aRb and bRc imply aRc","Every member is related to itself","No two members are related"],1,"Transitivity closes two-step paths."],
[11,"An equivalence relation must be:",["Reflexive, symmetric and transitive","Symmetric and antisymmetric only","Reflexive only","Transitive only"],0,"An equivalence relation satisfies all three properties."],
[11,"If f(x)=2x+1 and g(x)=x², find (f∘g)(2).",["9","25","16","10"],0,"g(2)=4; f(4)=2×4+1=9."],
[11,"Which condition defines a function?",["Each input has exactly one output","Each output has exactly one input","Each input has two outputs","All outputs are distinct"],0,"Functions associate each domain input with one unique output (outputs may repeat)."],
[11,"A partial order must be:",["Reflexive, symmetric, transitive","Reflexive, antisymmetric, transitive","Only symmetric","Only transitive"],1,"Partial orders require reflexivity, antisymmetry, and transitivity."],
[11,"If f(x)=x+2 and g(x)=3x, find (g∘f)(1).",["5","7","9","11"],2,"f(1)=3, then g(3)=9. Composition order matters."]
];
