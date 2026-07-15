# Mapa del argumento — reconstrucción formal y diagnóstico

> Documento de trabajo del refactor. Reconstruye el argumento **tal como está** (no como
> quisiéramos que estuviera), localiza las premisas ocultas y marca dónde se rompe.
> Escrito por el orquestador (Fable 5) leyendo `ensayo/00_ensayo.md` y `ensayo/tesis.md`.

## 1. El argumento actual, formalizado

El texto declara **dos tesis** y afirma explícitamente que la segunda no se deduce de la primera.

### Tesis Práctica (TP)

| | |
|---|---|
| **P1** | Emular la física continua, química y 3D del carbono vivo sobre silicio digital de Von Neumann exige recursos (energía, memoria, tiempo, cableado) que crecen y se ramifican con la escala. |
| **P2** | Esos costos se siguen de elecciones de sustrato/arquitectura (electrones-en-cable vs. iones-en-fluido; conmutación binaria vs. modulación graduada; cableado 2D vs. 3D con entrega circulatoria). |
| **C1** | ∴ El costo de realización no es arbitrario sino **estructural**. La "neutralidad ingenua" del sustrato es falsa. |

**Soporte:** los cinco ejes (§II.1–II.6) y el benchmark escalonado (brecha 3·10³× – 1,04·10⁵×).

### Tesis Ontológica (TO)

| | |
|---|---|
| **P3** | Un sistema autopoiético produce y regenera continuamente los componentes y la frontera que lo constituyen (Varela, Maturana & Uribe, 1974). |
| **P4** | La precariedad activamente gestionada (adaptividad; Di Paolo, 2005) engendra **normatividad intrínseca**: hay estados buenos y malos *para el sistema*. |
| **P5** | El silicio digital no es autopoiético: el paso de electrones no lo regenera, lo degrada. |
| **P6** | *(puente conjetural)* El carácter fenoménico (qualia) **requiere** esa vulnerabilidad homeostática constitutiva. |
| **C2** | ∴ Es dudoso que el silicio digital origine qualia. |

**Soporte:** Exp 10 (κ) como "firma operacional" de la autopoiesis.

## 2. Dónde se rompe

### 2.1 TP refuta a un adversario que no existe

C1 —"el costo de realización es estructural"— **no lo niega ningún funcionalista**. Putnam (1967)
y Fodor (1974) formulan la realizabilidad múltiple como tesis sobre la *posibilidad* de
realización y la *autonomía de las ciencias especiales*, no sobre su costo. El propio texto lo
concede dos veces (§III.1: «la realizabilidad múltiple *predice* que los detalles de
implementación varíen»). La "neutralidad ingenua" es una posición de cultura ingenieril, sin
defensor en la literatura filosófica.

> **Consecuencia:** TP es verdadera y casi trivial. Cinco ejes y diez experimentos sostienen
> una conclusión que el adversario concede de entrada.

### 2.2 TO es ajena y descansa entera sobre P6, que no se argumenta

P6 **es** la tesis. Y el texto admite que su aval «es la plausibilidad del cuadro, no una
demostración» (§III.3). P3–P5 no la implican: de que un sistema tenga normatividad intrínseca no
se sigue que tenga experiencia. El propio texto lo reconoce: «que ese importar sea ya
*experiencia fenoménica* es un paso adicional que ni Varela ni Thompson dan por saldado, y yo
tampoco».

Además P6 es, sin residuo, la tesis de Searle (1980, 1992), Thompson (2007), Damasio (2010) y
Seth (2018, 2021) — lo que §III.5 ya concede.

> **Consecuencia:** la única tesis filosóficamente interesante del trabajo (a) no está
> argumentada y (b) no es del autor.

### 2.3 El laboratorio no hace trabajo para la única tesis interesante

Si TO no se deduce de TP (y el texto insiste en ello cuatro veces: §III.1, §IV.3, §IV.8,
Conclusión), entonces **los cinco ejes y los diez experimentos son ortogonales al aporte**.
El propio texto lo dice en §IV.8: «La variable que aísla lo ontológico **no es ninguno de los
cinco ejes de eficiencia de la Parte II**».

> **Consecuencia:** el aporte queda reducido a "construí un laboratorio" — exactamente el
> desenlace que el encargo prohíbe.

### 2.4 El Exp 10 (κ) es circular — y peor de lo sospechado

`simulaciones/experimento_autopoiesis.py`, función `simular()`:

```python
if acoplado:
    R = R - CONSUMO * spike      # el recurso que computa...
    R = R + P * (1.0 - R)        # ...es el que la bomba P regenera → lesionar P degrada el cómputo
else:
    R = np.ones(M)               # estipulado constante. P NO APARECE en esta rama.
```

- κ = 0,00 para el "silicio" **no es una medida**: es una identidad aritmética. `P` es una
  variable muerta en esa rama. El experimento **no puede fallar**.
- κ ≈ 0,88 para el "carbono" mide que un recurso consumido y no repuesto se agota.

> **Consecuencia 1:** la afirmación de §III.5 —κ como «la primera medida operacional de la
> precariedad de Di Paolo y del acoplamiento homeostático de Damasio»— es a la vez **circular**
> y una **sobreafirmación de prioridad**.
>
> **Consecuencia 2 (la productiva):** κ no es propiedad de un sustrato sino **de un corte**. Si
> se traza la frontera del sistema "silicio" incluyendo su fuente de alimentación, κ deja de ser
> 0. Esto no es un defecto a tapar: es el hallazgo. Ver §3.

### 2.5 La premisa oculta: P5 presupone una individuación no examinada

P5 dice «el silicio digital no es autopoiético». Pero la autopoiesis no es propiedad de un
*material*: es propiedad de una **organización a una escala**. La pregunta que P5 no hace es
**¿autopoiético QUÉ unidad?**

El texto llega al borde de verlo y retrocede. §III.4, a propósito del tubo del grillo de Webb:
«lo decisivo no es el *carbono* como material, sino la **autopoiesis** como organización». Correcto
— pero entonces jamás pregunta *de qué unidad* se predica la organización, y sigue asumiendo
silenciosamente **el chip** como candidato, igual que asume **el organismo** del otro lado.

> **Ésta es la premisa oculta del debate entero**, no solo de este texto: tanto el funcionalista
> («el chip podría ser consciente») como el enactivista («solo lo vivo lo es») dan por resuelta
> la individuación del candidato. Ninguno la argumenta.

## 3. La grieta que el diagnóstico abre (hipótesis a someter a crítica adversarial)

El fallo de los sistemas digitales podría no ser **material** sino **mereológico**:

- En una célula, la frontera que la individúa **es producto de la red metabólica que esa frontera
  encierra**. Frontera y mantenimiento coinciden en la misma escala y en la misma actividad. La
  unidad no la elige un observador: la produce el sistema.
- En todo sistema digital conocido, **a cada escala candidata**, la frontera la pone alguien más:
  - *chip* → frontera de fabricación (la traza TSMC, no el chip);
  - *servidor / centro de datos* → frontera administrativa y jurídica; hay mantenimiento
    (técnicos, redundancia, autoescalado) pero es **delegado** en agentes cuya normatividad es
    previa y cuyos fines no son los del sistema;
  - *Internet* → no hay frontera: red abierta, sin dentro/fuera con hecho de la materia.

De ahí dos distinciones candidatas:

| | |
|---|---|
| **Automantenimiento delegado** | El sistema persiste porque otro —con normatividad propia y previa— lo mantiene. Las normas son del mantenedor. |
| **Automantenimiento constitutivo** | La actividad que mantiene al sistema **es la misma** que lo constituye como unidad. Las normas son suyas porque no hay otras que puedan serlo. |

Y un test para no confundir delegación con mera dependencia: la célula depende absolutamente del
entorno (glucosa, O₂) — eso es **dependencia ambiental**, no delegación. Hay delegación cuando el
*mantener* lo ejecuta un agente cuya propia viabilidad fija qué cuenta como "mantenido".

**Objeción anticipada (la más fuerte):** las normas de la célula también vendrían de fuera (la
selección natural), luego su normatividad también sería derivada.
**Respuesta:** la selección explica *por qué* la célula tiene la organización que tiene; no
constituye la normatividad *ahora*. Test contrafáctico: suprimida la selección, la célula sigue
teniendo estados que la matan. Suprimidos los humanos, el centro de datos no tiene estados
*peores para él* — tiene estados peores respecto de un SLA que alguien escribió.

## 4. Lo que este diagnóstico obliga a decidir

1. TP se conserva pero **degradada**: deja de ser tesis y pasa a ser trasfondo empírico.
2. TO se **abandona como tesis propia** (es de Searle/Thompson/Damasio/Seth) — y de todos modos
   no está argumentada.
3. κ se **conserva reformado**: no como medida de autopoiesis, sino como demostración de que la
   métrica de acoplamiento **es relativa al corte**. El experimento pasa de *probatorio* a
   *contraejemplo de la tesis anterior del propio autor*.
4. Los cinco ejes se conservan si —y solo si— se reinterpretan: no miden *ineficiencia*, miden
   **el grado en que las condiciones de persistencia del sistema están fuera de él**
   (la memoria está en otro sitio; la energía viene de fuera; no hay vasculatura en el volumen de
   cómputo). Eso sí toca la individuación. El costo era el síntoma; la **externalización** es el
   asunto.

## 5. Estado

- [x] Reconstrucción formal del argumento actual
- [x] Localización de premisas ocultas (§2.5)
- [x] Diagnóstico de circularidad del Exp 10 (§2.4) — *confirmado por lectura del código; auditoría numérica delegada*
- [ ] Hipótesis §3 sometida a crítica adversarial → `adversarial-review.md`
- [ ] Comparación con candidatos generados a ciegas → `thesis-candidates.md`
- [ ] Decisión final → `decisions.md`
