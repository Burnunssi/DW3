const fSoma = (num1, num2) =>  {
    return num1 + num2;
}

const fSubtracao = (num1, num2) => {
    return num1 - num2;
}

const fMultiplicacao = (num1, num2) =>  {
    return num1 * num2;
}

const fDivisao = (num1, num2) =>  {
    return num1 / num2;
}

const fCalculo = (req, res) => (async () => {
    const { num1 } = req.body
    const { num2 } = req.body
    const { operacao } = req.body

    switch (operacao) {
        case '+':
            var resultado = fSoma(num1, num2);
            break;
        case '-':
            var resultado = fSubtracao(num1, num2);
            break;
        case '*':
            var resultado = fMultiplicacao(num1, num2);
            break;
        case '/':
            var resultado = fDivisao(num1, num2);
            break;
        default:
            break;
    }
    res.json({ "Resultado": resultado });
})();

module.exports = {
    fCalculo,
}
