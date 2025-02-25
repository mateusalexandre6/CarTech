export function formatarTelefone(telefone) {
    // Remove all non-numeric characters
    telefone = telefone.replace(/\D/g, '');

    // Check if the phone number has the correct length
    if (telefone.length === 10) {
        // Format as (XX) XXXX-XXXX
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 11) {
        // Format as (XX) XXXXX-XXXX
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    else if (telefone.length === 9) {
        // Format as XXXX-XXXX
        return telefone.replace(/(\d{4})(\d{4})/, '$1-$2');
    }
    else if (telefone.length === 8) {
        // Format as XXXXX-XXXX
        return telefone.replace(/(\d{5})(\d{4})/, '$1-$2');
    
    } else {
        // Return the original phone number if it doesn't match the expected length
        return telefone;
    }
}
