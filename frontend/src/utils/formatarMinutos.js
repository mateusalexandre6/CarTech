

export function formatarMinutos(minutos) {
    const minutosInteiros = Math.floor(minutos);
    const segundos = Math.round((minutos - minutosInteiros) * 60);
    if (!segundos) return `${minutosInteiros} minutos`;
    return `${minutosInteiros} minutos`;
}

